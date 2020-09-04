import React from "react";
import { State } from "../models/index";

export function saveState(state: State): void {
  const { tasks, columns, columnOrder } = state;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("columns", JSON.stringify(columns));
  localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
}

export function getState(): State {
  return {
    tasks: JSON.parse(localStorage.tasks),
    columns: JSON.parse(localStorage.columns),
    columnOrder: JSON.parse(localStorage.columnOrder),
  };
}

export function handleImageSubmit(
  event: React.FormEvent<HTMLInputElement>,
  imgId: string,
  altText: string
) {
  if (event.currentTarget.files && event.currentTarget.files[0]) {
    const reader = new FileReader();

    //src to pass to props
    const srcImg = `data:${event.currentTarget.files[0].type};base64,`;
    //save source in localStorage
    localStorage.setItem(imgId, srcImg);
    //alt text for image (stripped file name)
    localStorage.setItem(
      altText,
      event.currentTarget.files[0].name.replace(/(.jpeg|.png|.jpg)/g, "")
    );

    const handleFileRead = (event: ProgressEvent<FileReader>) => {
      const imgData: string | ArrayBuffer | null = reader.result;

      if (typeof imgData === "string") {
        localStorage[imgId] += btoa(imgData);
      }
    };

    reader.onloadend = handleFileRead;
    reader.readAsBinaryString(event.currentTarget.files[0]);
  }
}

export function handleDeleteImg(imgId: string, altText: string) {
  localStorage.removeItem(imgId);
  localStorage.removeItem(altText);
}
