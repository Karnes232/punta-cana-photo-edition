import React, { useEffect, useRef, useState } from 'react';
import './weddingExperience.css';
// Photo and film UI for the wedding planner page. The photos, films and all
// their text come from the Wedding Planner Page document in Sanity.

// A Sanity imageWithAlt as a plain responsive <img>: a thumbnail (640px wide
// for landscape photos) plus the full-size file.
const thumbWidth = (width) => Math.round((width * 640) / 1440);
export function IndianImage({asset,className='',alt=''}) {
  const url = asset?.asset?.url;
  const { width, height } = asset?.asset?.metadata?.dimensions || {};
  if (!url) return null;
  // Without known dimensions there's no thumbnail size, so the full file is used.
  const thumb = width ? `${url}?w=${thumbWidth(width)}` : url;
  return <img className={className} src={thumb} srcSet={width ? `${thumb} ${thumbWidth(width)}w, ${url} ${width}w` : undefined} sizes="(max-width: 640px) 85vw, 430px" width={width} height={height} loading="lazy" decoding="async" alt={asset.alt||alt} title={asset.alt||alt}/>;
}
export function WeddingGallery({images,copy,renderImage,label}) {
  const [active,setActive]=useState(0), [opened,setOpened]=useState(false);
  const [slide,setSlide]=useState(0);
  const dialog=useRef(null), touch=useRef(null),rail=useRef(null);
  const go=direction=>{const next=Math.max(0,Math.min(images.length-1,slide+direction));const child=rail.current?.children[next];if(!child)return;rail.current.scrollTo({left:child.offsetLeft,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
  useEffect(()=>{if(!opened)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[opened]);
  const move=direction=>setActive(value=>(value+direction+images.length)%images.length);
  const close=()=>{dialog.current.close();setOpened(false);};
  return <>
    <div className="wp-carousel-controls"><span aria-live="polite">{slide+1} / {images.length}</span><button type="button" onClick={()=>go(-1)} disabled={slide===0} aria-label={copy.previous}>←</button><button type="button" onClick={()=>go(1)} disabled={slide===images.length-1} aria-label={copy.next}>→</button></div>
    <div className="wp-rail" ref={rail} role="region" aria-label={label} tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(e.key==='ArrowRight'?1:-1);}}} onScroll={()=>{const cards=[...rail.current.children];const left=rail.current.scrollLeft;let nearest=0;cards.forEach((card,i)=>{if(Math.abs(card.offsetLeft-left)<Math.abs(cards[nearest].offsetLeft-left))nearest=i;});setSlide(nearest);}}>{images.map((asset,index)=><button className="wp-photo" type="button" key={asset._key||index} aria-label={`${copy.open}: ${label} ${index+1}`} onClick={()=>{setActive(index);setOpened(true);dialog.current.showModal();}}>{renderImage(asset)}<span className="wp-photo-hint" aria-hidden="true">↗</span></button>)}</div>
    <dialog ref={dialog} className="wp-dialog" aria-label={label} onClose={()=>setOpened(false)} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
      <button type="button" className="wp-dialog-close" onClick={close} aria-label={copy.close}>×</button>
      {opened&&<div className="wp-view" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const delta=e.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>60)move(delta<0?1:-1);touch.current=null;}}}>{renderImage(images[active],true)}</div>}
      <div className="wp-dialog-controls"><button type="button" onClick={()=>move(-1)} aria-label={copy.previous}>←</button><span aria-live="polite">{active+1} / {images.length}</span><button type="button" onClick={()=>move(1)} aria-label={copy.next}>→</button></div>
    </dialog>
  </>;
}
export function WeddingFilms({films,copy}) {
  const [active,setActive]=useState(null);
  // Films without a video file are skipped; a missing caption leaves just "Punta Cana".
  return <div className="wp-films">{(films||[]).filter(film=>film?.video?.asset?.url).map((film,index)=>{const title=film.caption;const label=[title,'Punta Cana'].filter(Boolean).join(' — ');const poster=film.poster?.asset?.url;return <figure key={film._key||title}><div className="wp-film">{active===index?<video controls autoPlay muted playsInline preload="none" poster={poster} aria-label={label} title={label} src={film.video.asset.url}/>:<button type="button" onClick={()=>setActive(index)} aria-label={`${copy.play}: ${title}`}>{poster&&<img src={poster} width="540" height="960" loading="lazy" alt={label} title={label}/>}<span className="wp-play" aria-hidden="true">▷</span></button>}</div><figcaption>{title}</figcaption></figure>;})}</div>;
}

