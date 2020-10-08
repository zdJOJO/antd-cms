/* eslint-disable no-unused-vars */
/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-08 13:11:38
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-08 13:38:48
 * @FilePath: \antd-cms\src\hooks\useTableData.ts
 */
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import http from '@http';

function useTableData(url: string): [any[], boolean, Dispatch<SetStateAction<any[]>>] {
  const unmount = useRef(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)
  function init() {
    setData([])
    setLoading(true)
    setError(false)
  }
  async function load() {
    init()
    !unmount.current && setLoading(true);
    try {
      const result = await http.get(url);
      !unmount.current && setData(result.list)
    } catch (error) {
      !unmount.current && setError(true)
    } finally {
      !unmount.current && setLoading(false)
    }
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  useEffect(() => {
    return () => {
      unmount.current = true
    }
  }, [])
  return [data, loading, setData]
}

export default useTableData