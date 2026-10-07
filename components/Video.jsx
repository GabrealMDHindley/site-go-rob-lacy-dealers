"use client";
import { useState } from "react";

// 16:9 video slot. With no `src` it shows the branded poster and a "video coming
// soon" caption; with an mp4 it plays inline; with a Vimeo/YouTube URL it embeds
// the player after the visitor presses play (keeps the page fast).
export default function Video({ src, poster, title, label = "Watch first" }) {
  const [playing, setPlaying] = useState(false);
  const isFile = src && /\.(mp4|webm|mov)(\?|$)/i.test(src);

  if (!src) {
    return (
      <div className="vframe" role="img" aria-label={`${title} — video coming soon`}>
        <img src={poster} alt="" width="1280" height="720" />
        <span className="vposter-play soon" aria-hidden="true"><PlayIcon /></span>
        <span className="vsoon">Video coming soon</span>
      </div>
    );
  }

  if (playing) {
    return (
      <div className="vframe">
        {isFile ? (
          <video src={src} poster={poster} controls autoPlay playsInline title={title} />
        ) : (
          <iframe
            src={src + (src.includes("?") ? "&" : "?") + "autoplay=1"}
            title={title} allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowFullScreen
          />
        )}
      </div>
    );
  }

  return (
    <div className="vframe">
      <img src={poster} alt="" width="1280" height="720" />
      <button className="vposter-play" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`}><PlayIcon /></button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
  );
}
