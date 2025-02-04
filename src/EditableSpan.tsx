import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditableSpan = ({ title, changeTitle }: EditableSpanPropsType) => {
  const [isEditMod, serIsEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState<string>(title);
  console.log(title);

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
  };
  const onEditMode = () => serIsEditMode(true);
  const offEditMode = () => {
    serIsEditMode(false);
    changeTitle(itemTitle);
  };

  return isEditMod ? (
    <input value={itemTitle} onChange={changeItemTitleHandler} autoFocus onBlur={offEditMode} />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};
