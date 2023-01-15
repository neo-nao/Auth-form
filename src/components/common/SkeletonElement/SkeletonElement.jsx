import styled from "styled-components";

const StyledSkeletonElement = styled.div`
  width: ${(props) => props.width ?? (props.size && props.size[0]) ?? "100px"};
  height: ${(props) => (props.size && props.size[1]) ?? "25px"};
  background: linear-gradient(to right, #b1b1b1 20%, #e1e1e1 40%, #b1b1b1 60%);
  background-size: 600%;
  background-position: left;
  border-radius: 5px;
  animation: loading 2s ease-in-out infinite;

  @keyframes loading {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
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
