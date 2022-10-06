const defaultCommonStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 80,
  height: 80,
  borderRadius: '0%',
  borderStyle: 'none',
  borderWidth: '0',
  borderColor: '#ffffff00',
  transform: 0 // "rotate(0deg)"
}

export const defaultStyle = {
  ...defaultCommonStyle,
  width: 270,
  height: 30,
  lineHeight: '30px',
  fontSize: 12,
  fontWeight: 'normal',
  color: '#000',
  backgroundColor: '#ffffff00',
  textAlign: 'left',
  wordSpacing: '10px'
}
