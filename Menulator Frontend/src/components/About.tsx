import React from "react";
import Popup from "./Popup";

export default function About(props) {
  const { toggleScreen } = props;
  return (
    <Popup close={toggleScreen}>
      <h1>About Menulator</h1>
      <div className="aboutTxt flex gap w-80 txt center">
        <p>
          For years, my wife and I have struggled meal planning. Not because we
          hate cooking, quite the opposite, actually.
        </p>
        <h4>Our big problem is thinking up the meals to make.</h4>
        <p>
          Mix that with our three little picky eaters, and we run into problems
          fast. I tried and tried to find other solutions we could use, even pay
          for, but all my searching came up short. Ones I found that might work
          used really extravagent meals, like "pommegranate infused moths-milk
          curry" (Whatever that is...)
        </p>
        <h2>Enter Menulator</h2>
        <p>
          I designed Menulator to work closely with the way normal people
          function. To be flexible with meals we <i>want</i> to eat, yet simple
          enought to actually take the guesswork out of it.
        </p>
        <h3>Using Menulator is easy.</h3>
        <ol>
          <li>
            Go to your recipes. I've already added a bunch you can add to your
            selection, but feel free to add to the list too if you can't find
            what you're looking for.
          </li>
          <li>
            Once you've selected your meals, go to your menu and click the "New
            Menu" button. Just like that, you'll get a meal plan with meals you
            actually like.
          </li>
          <li>
            Not sure about the list though? Just hit the redo button and you'll
            get another menu that you can cycle.
          </li>
        </ol>
        <p>Now let's get eatin'!</p>
      </div>
      <button className="btn select" onClick={toggleScreen}>
        <h3>Close</h3>
      </button>
    </Popup>
  );
}
