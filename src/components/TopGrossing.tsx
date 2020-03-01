import useReducerFetch from "../Hooks/useReducerFetch";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Vertical = styled.div`
  overflow-y: scroll;
  top: 20vw;
  position:relative;
  height: 60vw;
`;

const GrossingApp = styled.div``;

const GrossingAppName = styled.div``;

const GrossingAppImg = styled.img``;

const GrossingAppGenres = styled.div``;

const TopGrossing = () => {
  const [amount, setAmount] = useState(10);
  const { apps, isLoading } = useReducerFetch("top-grossing", amount);

  useEffect(() => {
    const fetchGrossing = entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          setAmount(currentAmount => currentAmount + 10);
        }
      });
    };

    const observer = new IntersectionObserver(fetchGrossing);
    const target = document.querySelector("#grossing-preload");
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);

  return (
    <Vertical>
      {isLoading
        ? "...loading"
        : apps.results.map((app, i) => {
            return (
              <GrossingApp key={i}>
                <GrossingAppImg
                  src={app.artworkUrl100}
                  alt={app.name + " image"}
                />
                <GrossingAppName>{app.name}</GrossingAppName>
                <GrossingAppGenres>{app.genres[0].name}</GrossingAppGenres>
              </GrossingApp>
            );
          })}

      <div id="grossing-preload" style={{padding: '1em'}}></div>
    </Vertical>
  );
};

export default TopGrossing;
