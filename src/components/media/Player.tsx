import { SourceModel } from "@api/iPlayApi";
import { useEffect, useRef } from "react";
import "plyr-react/plyr.css";
import Hls from "hls.js";
import Plyr, { APITypes, PlyrProps, PlyrInstance } from "plyr-react";

export interface PlayerProps {
    model: SourceModel[]
}

export function Player({ model }: PlayerProps) {
    const source = {
        type: "video",
        title: "",
        sources: model.map(item => ({
            src: item.url,
            title: item.name,
            type: "video/mp4"
        })),
    }
    return (
        <PlyrPlayer url={model[0].url} />
    )
}


export interface PlyrPlayerProps {
    url?: string
}

const PlyrPlayer = ({url}: PlyrPlayerProps) => {
  const ref = useRef<APITypes>(null);
  useEffect(() => {
    const loadVideo = async () => {
      const video = document.getElementById("plyr") as HTMLVideoElement;
      const hls = new Hls({
        xhrSetup: (xhr, url) => {
            xhr.setRequestHeader('referer', '');
        }
      });
      hls.loadSource(url!);
      hls.attachMedia(video);
      // @ts-ignore
      ref.current!.plyr.media = video;

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        (ref.current!.plyr as PlyrInstance).play();
      });
    };
    loadVideo();
  });

  return (
    <Plyr
      id="plyr"
      options={{ volume: 0.1 }}
      source={{} as PlyrProps["source"]}
      ref={ref}
    />
  );
};
