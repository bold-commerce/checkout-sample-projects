const useAnalytics = () => {
  const track = (eventName) => {
    switch(eventName) {
      case '/':
        // Landing page events
        break;
      case '/shipping':
        // Shipping page events
        break;
      case '/payments':
        // Payments page events
        break;
      default:
    }
  }

  return track;
};

export default useAnalytics;
