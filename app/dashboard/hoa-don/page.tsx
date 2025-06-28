"use client";

import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FiUsers, FiActivity, FiBarChart2, FiDatabase, FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState, useCallback } from 'react';
import { apiService } from '../../utils/api';
import { Stat, ChartData, TableCommentsData } from '../../types';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import Select from "react-select";
import HoaDonTable from 'src/components/HoaDonTable';
interface OptionType {
  value: number
  label: string
}
const customStylesSelects = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '8px',
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 1px #4F46E5',
      minHeight: '40px',
      '&:hover': {
        borderColor: '#4338CA',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#EEF2FF',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#4F46E5',
      fontWeight: 600,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#E0E7FF' : 'white',
      color: state.isFocused ? '#4338CA' : 'black',
      cursor: 'pointer',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9CA3AF',
      fontStyle: 'italic',
    }),
  };
export default function Dashboard() {

  const [tableData, setTableData] = useState<TableCommentsData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const router = useRouter()

  //check log in
  const { isLoggedIn,loading } = useAuth()
  useEffect(() => {
    if (!loading && !isLoggedIn) {
        router.push('/login?message=unauthorized')
      }
    }, [loading, isLoggedIn])
    
  //search filter
  const [searchName, setSearchName] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [searchGroupid, setSearchGroupid] = useState<number[]>([]);
  const [searchPostId, setSearchPostId] = useState("");

  //select group 
  const [options, setOptions] = useState<OptionType[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingSelect, setLoadingSelect] = useState(false)
  const select_group_limit = 5
  

  //load data lần đầu
  useEffect(() => {
    
    fetchOptions();
  }, []);

  const fetchOptions = useCallback(async () => {
    console.log("fetchOptions called", { loadingSelect, hasMore, page });

    if (loadingSelect || !hasMore) return
    setLoadingSelect(true)

    try {
      const params = {
            offset: page * select_group_limit,
            limit: select_group_limit,
      }
      const res = await apiService.getgroups(params);
      
      const newOptions: OptionType[] = res.data.map((group: any) => ({
        value: Number(group.group_id),
        label: group.group_name
      }))
      console.log("newOptions");
      console.log(newOptions);
      if (newOptions.length === 0) {
        setHasMore(false)  // Dừng gọi tiếp nếu api trả về rỗng
      } else {
        setOptions(prev => {
          const existingIds = new Set(prev.map(o => o.value));
          const filteredNewOptions = newOptions.filter(o => !existingIds.has(o.value));
          return [...prev, ...filteredNewOptions];
        });
        setPage(prev => prev + 1)
      }
    } catch (error) {
      console.error('Fetch options error:', error)
    } finally {
      setLoadingSelect(false)
    }
  }, [page, select_group_limit, loadingSelect, hasMore])

  // Hàm xử lý scroll bottom trong dropdown để gọi fetch thêm
  const handleMenuScrollToBottom = () => {
    if (!loadingSelect && hasMore) {
      fetchOptions()
    }
  }
  
    // Hàm xử lý chuyển trang
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    fetchStats(page,{
    name: searchName,
    content: searchContent,
    group_ids: searchGroupid,
    post_id: (searchPostId),
  });
  };

  console.log("SearchGroupId", searchGroupid);
  console.log("Value select:", options.filter(o => searchGroupid.includes(o.value)));

  async function fetchStats(offset: number,filters?: { name?: string; content?: string; group_ids?: number[]; post_id?: string }) {
        try {
          const params = {
            offset: offset,
            limit: 10,
            group_ids: filters?.group_ids,
            search_name: filters?.name || '',
            search_content: filters?.content || '',
            search_post_id: Number(filters?.post_id) || null,
          };

          const response = await apiService.getcommentsStats(params);
          console.log(response.data)
          // Kiểm tra nếu có dữ liệu trong response.data và nếu đó là một mảng
          if (!response?.data || !Array.isArray(response.data)) {
            throw new Error("Invalid posts data");
          }
          
          const processed = response.data.map((post: any) => {
            
            return {
              comment_url: post.comment_url,
              name: post.user_name,
              content: post.content,
              content_created: post.content_created,
              created_at: post.created_at,
              hours_diff: post.hours_diff,
              reply_count: post.reply_count,
              author_url: post.author_url,
              post_id: post.post_id
            };
          });
          setTotalItems(response.total)
          console.log("Total items:", response.total)
          setTableData(processed);
          setCurrentPage(offset);  
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
    }
  useEffect(() => {
      console.log("useEffect running!");
      fetchStats(1,{name: searchName,content: searchContent,group_ids: searchGroupid, post_id: searchPostId });
  }, [searchName, searchContent, searchGroupid, searchPostId]);

  const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
  const delta = 2;
  const range: (number | string)[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  // Always include the first page
  range.push(1);

  // Add "..." if there's a gap between 1 and left
  if (left > 2) {
    range.push("...");
  }

  // Add page numbers between left and right
  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  // Add "..." if there's a gap between right and last page
  if (right < totalPages - 1) {
    range.push("...");
  }

  // Always include the last page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};
  

  
    // Gọi hàm
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* <div>
          <h1 className="text-2xl font-bold text-gray-800">Facebook Comment</h1>
        </div>
        */}
        {/*Filter data */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by post id..."
              value={searchPostId}
              onChange={(e) => setSearchPostId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex-1 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search content..."
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex-1 mt-2 md:mt-0">
            <Select
                options={options}
                isMulti
                value={options.filter(o => searchGroupid.includes(o.value))}
                onChange={(selectedOptions) =>
                  setSearchGroupid(selectedOptions.map(o => o.value))
                }
                styles={customStylesSelects}
                onMenuScrollToBottom={handleMenuScrollToBottom}
                getOptionValue={(option) => String(option.value)} // <-- Quan trọng
              />

          </div>
        </div>

        {/* Recent Users Table */}
        <div className="card overflow-hidden">
          <h2 className="text-lg font-semibold mb-4"><FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-5 h-5 mr-2" />Facebook Group Comments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-visible">
              <thead className="bg-gray-50">
                <tr className="group relative">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    Post ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    Content Post
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    Thời gian đăng bài
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    Thời gian lấy bài
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    Số lượng reply
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-1200 uppercase tracking-wider">
                    Độ trễ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item) => (
                  <tr  className="group relative hover:bg-purple-50 cursor-pointer" >
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                      <a href={item.author_url} className="text-sm  block" target="_blank">
                        <div className="text-sm text-gray-500 max-w-[800px] max-h-[100px] overflow-hidden font-medium text-gray-900 text-ellipsis">{item.name}</div>
                     </a>
                    </td>
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 max-w-[800px] max-h-[100px] overflow-hidden font-medium text-gray-900 text-ellipsis">{item.post_id}</div>
                    </td>
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                      <a href={item.comment_url} className="text-sm  block" target="_blank">
                        <div className="text-sm text-gray-500 max-w-[800px] max-h-[100px] overflow-hidden font-medium text-gray-900 text-ellipsis">{item.content}</div>
                      </a>
                      
                      {/* Popup */}
                      <div className="absolute hidden group-hover:block z-50 left-0 top-full mt-2 
                          w-[800px] max-h-[600px] overflow-auto p-4 bg-white border border-gray-300 
                          shadow-lg rounded-md">
                        <p className="text-sm text-gray-800 break-words whitespace-normal">{item.content}</p>
                      </div>
                    </td>
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                      <div className="min-h-[30px] max-h-[30px] text-sm font-medium text-gray-900">{item.content_created}</div>
                    </td>
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                      <div className="min-h-[30px] max-h-[30px] text-sm font-medium text-gray-900">{item.created_at}</div>
                    </td>
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                      <div className="min-h-[30px] max-h-[30px] text-sm font-medium text-gray-900">{item.reply_count}</div>
                    </td>
                    <td className="min-h-[30px] max-h-[30px] px-6 py-4 whitespace-nowrap">
                      <div className="min-h-[30px] max-h-[30px] text-sm font-medium text-gray-900">{item.hours_diff}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Thêm phần phân trang */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, tableData.length)}
                  </span>{' '}
                  of <span className="font-medium">{tableData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {getPaginationRange(currentPage, totalPages).map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-accent1 border-accent1 text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } ${page === '...' && 'cursor-default'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 