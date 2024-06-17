export const reportWebVitals = (onPerfEntry: () => void) => { 
  if (onPerfEntry && onPerfEntry instanceof Function) { 
    import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB }) => { 
      onCLS(onPerfEntry); 
      onINP(onPerfEntry); 
      onLCP(onPerfEntry); 
      onTTFB(onPerfEntry); 
    }); 
  } 
}