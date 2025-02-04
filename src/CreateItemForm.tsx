import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "./Button";

export type CreateItemFormPropsType = {
  createItem: (title: string) => void;
};

export const CreateItemForm = ({ createItem }: CreateItemFormPropsType) => {
  const [itemTitle, setItemTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setItemTitle(event.currentTarget.value);
  };
  const maxTtitleLengthError: boolean = itemTitle.length > 10;
  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && itemTitle && !maxTtitleLengthError) createItemHandler();
  };
  const createItemHandler = () => {
    const trimmedTitle = itemTitle.trim();
    if (trimmedTitle !== "") {
      createItem(itemTitle);
    } else {
      setError("Title is required");
    }
    setItemTitle("");
  };
  return (
    <div>
      <input
        className={error ? "error" : ""}
        placeholder={"Write new task"}
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyDown={createItemOnEnterHandler}
      />
      <Button
        title={"+"}
        disabled={!itemTitle.length || maxTtitleLengthError}
        onClickHandler={createItemHandler}
      />
      {error && <div className={"error-message"}>{error}</div>}
      {!itemTitle && <div>Enter title, please</div>}
      {itemTitle && !maxTtitleLengthError && <div>Mx title length is 10 charters</div>}
      {maxTtitleLengthError && <div style={{ color: "red" }}>You title is to long</div>}
    </div>
  );
};
