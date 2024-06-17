import {CLSThresholds, INPThresholds, LCPThresholds} from 'web-vitals';


export const reportWebVitals = (onPerfEntry: () => void, page: string) => { 
  console.log("Page: ", page);
  console.log("CLS Thresholds: ", CLSThresholds, "INP Thresholds: ", INPThresholds, "LCP Thresholds: ", LCPThresholds);
  if (onPerfEntry && onPerfEntry instanceof Function) { 
    import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB }) => { 
      onCLS(onPerfEntry); 
      onINP(onPerfEntry); 
      onLCP(onPerfEntry); 
      onTTFB(onPerfEntry); 
    }); 
  } 
}

// https://www.npmjs.com/package/web-vitals