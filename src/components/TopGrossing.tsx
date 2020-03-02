import useReducerFetch from "../Hooks/useReducerFetch";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const Vertical = styled.div`
  overflow: auto;
  text-align: center;
  padding-bottom: 0;
  bottom: 0%;
`;

const GrossingApp = styled.div`
  display: flex;
  justify-content: start;
  padding: 1vw;
  margin: 1vw;
  border-bottom: 1px solid darkgrey;
  border-radius: 1vw;
  margin: 0vw 20vw 0vw 20vw;
`;
const GrossingAppImg = styled.img`
  justify-content: flex-start;
  max-width: 7vw;
  max-height: 7vw;
  min-width:  50px;
  min-height: 50px;
  border-radius: 50%;
  margin-right: 0.5vw;
  flex-direction: column;
`;

const GrossingAppName = styled.div`
  color: rgb(62, 62, 62);
  font-size: 0.8em;
  transition: font-weight 0.5s;
  margin: 2vw 0 0 2vw;
  ${GrossingApp}:hover & {
    font-weight: 600;
    box-shadow: 1vw 1vw 5% grey;
  }
`;

const GrossingAppGenres = styled.p`
  text-align: left;
  color: lightgrey;
  font-size: 0.8em;
  font-weight: 600;
  transition: font-weight 0.5s;
  transition: color 0.5s;
  ${GrossingApp}:hover & {
    font-weight: 1000;
    box-shadow: 1vw 1vw 5% grey;
    color: grey;
  }
`;

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
                <GrossingAppName>
                  {app.name}
                  <GrossingAppGenres>{app.genres[0].name}</GrossingAppGenres>
                </GrossingAppName>
              </GrossingApp>
            );
          })}

      <div id="grossing-preload" style={{ padding: "5vw" }}></div>
    </Vertical>
  );
};

export default TopGrossing;
