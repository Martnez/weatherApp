import PropTypes from "prop-types"
const Input = ({ value, name,onChange }) => (
  <input
    value={value}
    type="text"
    className="input"
    name={name}
    onChange={(event) => onChange(event.target.value)}
  />
);
Input.propTypes={
    name:PropTypes.string,
    value:PropTypes.string,
    onChange:PropTypes.func
}
const Image = ({ name, width, height }) => (
  <img
    src={name}
    alt={name + " " + "image"}
    style={{
      borderRadius: "100%",
      border: "none",
      height: { height },
      width: { width },
    }}
  />
);
Image.propTypes={
    name:PropTypes.string,
    width:PropTypes.string,
    height:PropTypes.string
}
const Images = ({ name }) => (
  <img
    src={name}
    alt={name + " " + "image"}
    style={{
      borderRadius: "100%",
      border: "none",
      height: "2rem",
      width: "2rem",
    }}
  />
);
Images.propTypes={
    name:PropTypes.string
}
export { Image, Images,Input };
