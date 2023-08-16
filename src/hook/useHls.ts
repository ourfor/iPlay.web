import Hls from "hls.js";
import { Options } from "plyr"
import { useEffect, useRef, useState } from "react";

export const useHls = (src: string, options: Plyr.Options | null) => {
    const hls = useRef<Hls>(new Hls());
    const hasQuality = useRef<boolean>(false);
    const [plyrOptions, setPlyrOptions] = useState<Options | null>(options);
  
    useEffect(() => {
      hasQuality.current = false;
    }, [options]);
  
    useEffect(() => {
      hls.current.loadSource(src);
      // NOTE: although it is more reactive to use the ref, but it seems that plyr wants to use the old as lazy process
      hls.current.attachMedia(document.querySelector(".plyr-react")!);
      /**
       * You can all your custom event listener here
       * For this example we iterate over the qualities and pass them to plyr player
       * ref.current.plyr.play() ❌
       * console.log.bind(console, 'MANIFEST_PARSED') ✅
       * NOTE: you can only start play the audio here
       * Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
       */
      hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (hasQuality.current) return; // early quit if already set
  
        const levels = hls.current.levels;
        const quality: Plyr.Options["quality"] = {
          default: levels[levels.length - 1].height,
          options: levels.map((level) => level.height),
          forced: true,
          /* `onChange` is a callback function that gets triggered when the user changes the quality of
         the video. It takes in a `newQuality` parameter which is the new quality selected by the
         user. */
          onChange: (newQuality: number) => {
            console.log("changes", newQuality);
            levels.forEach((level, levelIndex) => {
              if (level.height === newQuality) {
                hls.current.currentLevel = levelIndex;
              }
            });
          },
        };
        setPlyrOptions({ ...plyrOptions, quality });
        hasQuality.current = true;
      });
    });
  
    return { options: plyrOptions };
  }