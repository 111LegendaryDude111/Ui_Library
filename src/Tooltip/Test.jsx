// render props
<Tooltip
  position="top"
  content={
    <div>
      Hello <a>world!</a>
    </div>
  }
>
  {(props) => (
    <button
      onMouseEnter={(e) => {
        props.onMouseEnter(e);
        myMouseEnter(e);
      }}
      {...props}
    >
      Trigger
    </button>
  )}
</Tooltip>;

// cloneElement
<Tooltip
  content={
    <div>
      Hello <a>world!</a>
    </div>
  }
>
  <Component />
  <button>Trigger</button>
</Tooltip>;

function Tooltip({ children }) {
  return React.cloneElement(children, {
    ...children.props,
    onMouseEnter: (e) => {
      myMouseEnter(e);
      children.props.onMouseEnter(e);
    },
  });
}
