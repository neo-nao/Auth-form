const flexbox = (flexValues) => {
  const {
    direction = "row",
    justify = "center",
    align = "center",
  } = flexValues ?? {};

  return `
    display:flex;
    flex-direction:${direction};
    justify-content:${justify};
    align-items:${align};
    `;
};

export { flexbox };
