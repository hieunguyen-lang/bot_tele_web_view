"use client";

import React from 'react';
import DashboardLayoutNoSidebar from '../components/DashboardLayoutNoSidebar';
import DashboardLayout from '../components/DashboardLayout';
import AuthProvider from '../layout'
import PostCardList from '../components/PostCardList';
import { FiUsers, FiActivity, FiBarChart2, FiDatabase,FiAlertCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { apiService } from '../utils/api';
import { Stat, ChartData, TablePostData } from '../types';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Select from "react-select";
import { mockPosts } from '../components/mockdata/postcardlist';
import Navbar from '../components/Navbar';

export default function Dashboard() {

    const [tableData, setTableData] = useState<TablePostData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState(0);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const router = useRouter()
    const { isLoggedIn,loading } = useAuth()
    //search filter
    const [searchName, setSearchName] = useState("");
    const [searchContent, setSearchContent] = useState("");
    const [searchGroupid, setSearchGroupid] = useState<number[]>([]);
    const [searchPostId, setSearchPostId] = useState("");
  
  
    const options = [
      { value: 658484092993320, label: "Cộng đồng thiết kế website uy tín giá rẻ" },
      { value: 462482521683005, label: "HOMESTAY HÀ NỘI ☑️" },
      { value: 434990041885698, label: "HOMESTAY, KHÁCH SẠN HÀ NỘI" },
      { value: 863933957570229, label: "Homestay Hà Nội Giá Rẻ" },
      { value: 1198365520521080, label: "HomeStay Sinh Viên" },
      { value: 311253627456359, label: "CẦN LÀ CÓ(Haui)" },
      { value: 392469703338464, label: "Hội Thiết Kế Website Và SEO Web Online (FREELANCER UY TÍN)❤️" },
    ];
    
  
    useEffect(() => {
    if (!loading && !isLoggedIn) {
        router.push('/login?message=unauthorized')
      }
    }, [loading, isLoggedIn])
    async function fetchStats(offset: number,filters?: { name?: string; content?: string; group_ids?: number[]; post_id?: string,group_type?: string }) {
          try {
            const params = {
              offset: offset,
              limit: 25,
              group_ids: filters?.group_ids,
              search_name: filters?.name || '',
              search_content: filters?.content || '',
              search_post_id: Number(filters?.post_id) || null,
              group_type: filters?.group_type || ''
            };
  
            const response = await apiService.getpostsStats(params);
            console.log(response.data)
            // Kiểm tra nếu có dữ liệu trong response.data và nếu đó là một mảng
            if (!response?.data || !Array.isArray(response.data)) {
              throw new Error("Invalid posts data");
            }
            
            const processed = response.data.map((post: any) => {
              
              return {
                 posturl: post.post_url,
                name: post.user_name,
                content: post.content,
                content_created: post.content_created,
                created_at: post.created_at,
                hours_diff: post.hours_diff,
                reaction_count: post.reaction_count,
                comment_count: post.comment_count,
                share_count: post.share_count,
                image_url: post.image_url,
                type: post.type,
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
        fetchStats(1,{name:searchName,content:searchContent,group_ids:searchGroupid,post_id:searchPostId});
    }, [searchName, searchContent, searchGroupid, searchPostId]);
    
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const fetchNextPage = async () => {
        if (isFetchingMore || currentPage >= totalPages) return;
        setIsFetchingMore(true);
        const nextPage = currentPage + 1;

        try {
          const params = {
            offset: nextPage,
            limit: 10,
            group_ids: searchGroupid,
            search_name: searchName || '',
            search_content: searchContent || '',
            search_post_id: Number(searchPostId) || null,
          };

          const response = await apiService.getpostsStats(params);
          
          if (Array.isArray(response.data)) {
            const processed = response.data.map((post: any) => ({
              posturl: post.post_url,
              name: post.user_name,
              content: post.content,
              content_created: post.content_created,
              created_at: post.created_at,
              hours_diff: post.hours_diff,
              reaction_count: post.reaction_count,
              comment_count: post.comment_count,
              share_count: post.share_count,
              image_url: post.image_url,
              type: post.type,
            }));
            console.log(processed)
            setTableData(prev => [...prev, ...processed]);
            setCurrentPage(nextPage);
            setTotalItems(response.total);
          }
        } catch (error) {
          console.error("Error fetching next page:", error);
        } finally {
          setIsFetchingMore(false);
        }
      };
  

    // Gọi hàm
return (
    <DashboardLayoutNoSidebar>
      <>
      {/*Filter data */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Tìm theo tên..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Tìm theo post ID..."
            value={searchPostId}
            onChange={(e) => setSearchPostId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Tìm theo nội dung..."
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          />
          <Select
            options={options}
            isMulti
            value={options.filter(o => searchGroupid.includes(o.value))}
            onChange={(selectedOptions) => setSearchGroupid(selectedOptions.map(o => o.value))}
            placeholder="Chọn Group (có thể chọn nhiều)..."
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: '#f3f4f6', // xám nhẹ (tailwind bg-gray-100)
                borderColor: '#d1d5db', // gray-300
                '&:hover': { borderColor: '#3b82f6' }, // blue-500
                boxShadow: 'none',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#bfdbfe', // blue-200
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#1e40af', // blue-900
              }),
              placeholder: (base) => ({
                ...base,
                color: '#6b7280', // gray-500
              }),
            }}
          />
        </div>

        {/* Thay vì map trực tiếp PostCard, bạn dùng PostCardList */}
        <PostCardList 
        posts={tableData} 
        fetchNextPage={fetchNextPage}
        hasMore={currentPage < totalPages}
        />
      </>
  
    </DashboardLayoutNoSidebar>
  );
} 