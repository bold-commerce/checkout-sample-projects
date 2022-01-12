const useVariants = () => {
  const handleVariants = (description) => {
    if (description !== 'Default Title') {
      return description.split(' / ');
    }
    return [];
  }
  return handleVariants;
}

export default useVariants;
