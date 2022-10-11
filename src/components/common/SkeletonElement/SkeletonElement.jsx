import styled from "styled-components";

const StyledSkeletonElement = styled.div`
  width: ${(props) => props.width ?? (props.size && props.size[0]) ?? "100px"};
  height: ${(props) => (props.size && props.size[1]) ?? "25px"};
  background-color: #b1b1b1;
  border-radius: 5px;
`;

const SkeletonElement = ({ onRender = true, size, width, style }) => {
  const sizeArr =
    size === "small"
      ? [125, 15]
      : size === "medium"
      ? [150, 30]
      : size === "large"
      ? [185, 37.5]
      : size;

  return onRender ? (
    <StyledSkeletonElement
      width={width}
      size={sizeArr}
      style={style}
    ></StyledSkeletonElement>
  ) : (
    ""
  );
};

export default SkeletonElement;
