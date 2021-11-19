const useAnalytics = () => {
  const trackEvent = (eventName) => {
    switch(eventName) {
      case 'landing_page':
        // Landing page events
        break;
      case 'set_customer':
        // Customer events
        break;
      case 'set_shipping_address':
        // Complete shipping address events
        break;
      case 'set_billing_address':
        // Complete shipping address events
        break;
      case 'apply_discount_code':
        // Apply discount code events
        break;
      case 'remove_discount_code':
        // Remove discount code events
        break;
      case 'set_shipping_line':
        // Selected shipping line events
        break;
      case 'click_complete_order':
        // Order complete events
        break;
      case 'thank_you':
        // Thank you page events
        break;
      default:
    }
  }

  return trackEvent;
};

export default useAnalytics;
