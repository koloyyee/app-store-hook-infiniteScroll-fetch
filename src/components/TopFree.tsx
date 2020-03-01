import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useReducerFetch from "../Hooks/useReducerFetch";

const Horizontal = styled.div`
  position: sticky;
  top:0%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: scroll;
  background-color: white;
`;

const FreeAppImg = styled.img`
  width: 5vw;
  border-radius: 5%;
`;

const FreeApp = styled.div`
  padding: 1vw;
  max-height: 12vw;
`;

const FreeAppName = styled.div`
  color: rgb(62, 62, 62);
  font-size: 0.8vw;
  transition: font-weight 0.5s;
  ${FreeApp}:hover & {
    font-weight: 600;
    box-shadow: 1vw 1vw 5% grey;
  }
`;

const FreeAppGenres = styled.div`
  color: lightgrey;
  font-size: 0.5vw;
  font-weight: 600;
  transition: font-weight 0.5s;
  transition: color 0.5s;
  ${FreeApp}:hover & {
    font-weight: 1000;
    box-shadow: 1vw 1vw 5% grey;
    color: grey;
  }
`;

const TopFree: React.FC = () => {
  // const [isFetching, setIsFetching] = useState(false);
  const [amount, setAmount] = useState(10);
  const { apps, isLoading } = useReducerFetch("top-free", amount);

  useEffect(() => {
    const fetchMore = entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          setAmount(currentAmount => currentAmount + 10);
          console.log(" fetching by scroll ");
        }
      });
    };
    const observer = new IntersectionObserver(fetchMore);

    const target = document.querySelector("#preload");
    observer.observe(target);

    return () => observer.unobserve(target);
  }, []);

  return (
    <>
      <Horizontal className="top-free">
        {isLoading
          ? "...loading"
          : apps.results.map((app, i) => {
              return (
                <FreeApp key={i}>
                  <FreeAppName>{app.name}</FreeAppName>
                  <FreeAppGenres>{app.genres[0].name}</FreeAppGenres>
                  <FreeAppImg
                    src={app.artworkUrl100}
                    alt={app.name + " image"}
                  />
                </FreeApp>
              );
            })}

        <div id="preload" style={{ padding: "1em" }}></div>
      </Horizontal>
    </>
  );
};

export default TopFree;
