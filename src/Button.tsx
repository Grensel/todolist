type ButtonPropsType = {
  title: string;
  onClickHandler?: () => void;
  disabled?: boolean;
  className?: string;
};

export const Button = ({
  title,
  onClickHandler,
  disabled,
  className,
}: ButtonPropsType) => {
  return (
    <button disabled={disabled} className={className} onClick={onClickHandler}>
      {title}
    </button>
  );
};
