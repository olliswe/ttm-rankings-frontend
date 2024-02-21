import Fuse from "fuse.js";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";

interface INameSearch<T> {
  fullDataSet: T[];
  setResults: (result: any) => void;
  placeholder: string;
  searchKey: string;
}

const NameSearch = <T,>({
  fullDataSet,
  setResults,
  placeholder,
  searchKey,
}: INameSearch<T>) => {
  const [searchText, setSearchText] = useState("");
  const fuseRef = useRef<Fuse<unknown>>();

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: true,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.2,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [searchKey],
  };

  const onChange = (e: any) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      setResults(fullDataSet);
    } else {
      console.log(fuseRef.current?.search(e.target.value));
      setResults(fuseRef.current?.search(e.target.value).map((x) => x.item));
    }
  };

  useEffect(() => {
    fuseRef.current = new Fuse(fullDataSet, options);
  }, [fullDataSet]);

  return (
    <Input
      allowClear
      onChange={onChange}
      value={searchText}
      placeholder={placeholder}
    />
  );
};

export default NameSearch;
