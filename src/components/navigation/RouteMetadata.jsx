import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMetadata, siteOrigin } from '../../data/siteRoutes.js';

export default function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page=routeMetadata(pathname);
    document.title=page.title;
    const meta=(key,value,property=false)=>{
      let tag=document.head.querySelector(`meta[${property?'property':'name'}="${key}"]`);
      if(!tag){tag=document.createElement('meta');tag.setAttribute(property?'property':'name',key);document.head.append(tag)}
      tag.content=value;
    };
    meta('description',page.description);
    meta('robots',page.indexable?'index, follow':'noindex, follow');
    for(const [key,value] of Object.entries({'og:title':page.title,'og:description':page.description,'og:url':page.canonical?siteOrigin+page.canonical:siteOrigin,'og:image':siteOrigin+'/social-preview.png','og:type':'website'}))meta(key,value,true);
    meta('twitter:card','summary_large_image');meta('twitter:title',page.title);meta('twitter:description',page.description);meta('twitter:image',siteOrigin+'/social-preview.png');
    let canonical=document.head.querySelector('link[rel="canonical"]');
    if(!page.canonical){canonical?.remove()}else{if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}canonical.href=siteOrigin+page.canonical}
    // Raw HTML owns route-specific structured data; remove it after SPA route changes.
    document.getElementById('route-structured-data')?.remove();
  },[pathname]);
  return null;
}
