import React, { useEffect, useState } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Restaurant } from "./Restaurant";
import "./restaurant.css";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const AllRestaurants = (props): JSX.Element => {
  const { chosedTags, day, restaurants, filters } = props;

  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    const filterByTags = (restaurant) =>
      !filters.tags ||
      filters.tags?.length === 0 ||
      _.intersection(filters.tags, restaurant.tags).length > 0;

    const filterByDay = (restaurant) =>
      !filters.day || restaurant.openingTimes[filters.day] != null;

    const filterByHour = (restaurant) => {
      const { day, hour } = filters;
      const wasNotChosen = !day || !hour;
      if (wasNotChosen) return true;

      if (!restaurant.openingTimes[day]) return false;

      const openingHour = restaurant.openingTimes[day][0];
      const closingHour = restaurant.openingTimes[day][1];

      return (
        dayjs(`01-01-2000 ${hour}`).isSameOrAfter(
          `01-01-2000 ${openingHour}`
        ) &&
        dayjs(`01-01-2000 ${hour}`).isSameOrBefore(`01-01-2000 ${closingHour}`)
      );
    };

    setFilteredRestaurants(
      restaurants.filter(filterByTags).filter(filterByDay).filter(filterByHour)
    );
  }, [filters]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {filteredRestaurants.map((restaurant, i) => (
        <div key={i} style={{ margin: "16px" }}>
          <Restaurant restaurant={restaurant} chosedTags={filters.tags} />
        </div>
      ))}
    </div>
  );

  return null;
};
