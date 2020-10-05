/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-05 13:15:23
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-05 15:01:15
 * @FilePath: \antd-cms\src\hooks\usetableData.ts
 */
import { useState } from 'react'
import http from '@http';

function useTableData(url: string): [any[], boolean, any, () => void] {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  function init() {
    setData([])
    setLoading(true)
    setError(false)
  }
  async function load() {
    init()
    setLoading(true);
    try {
      const result = await http.get(url);
      setData(result.list)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  return [data, loading, error, load]
}

export default useTableData