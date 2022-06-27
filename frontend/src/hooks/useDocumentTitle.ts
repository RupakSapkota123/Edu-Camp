import React from "react";

const useDocumentTitle = (title: string) => {
  React.useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "EDU-Camp | Home";
    }
  }, [title]);
};

export default useDocumentTitle;
