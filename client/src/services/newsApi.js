// src/services/newsApi.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchAllNews = async (query = 'latest', page = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get('/all-news', {
      params: { q: query, page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all news:", error);
    throw error.response ? error.response.data : new Error('Network error or server not responding');
  }
};

export const fetchTopHeadlines = async (category = 'general', page = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get('/top-headlines', {
      params: { category, page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error.response ? error.response.data : new Error('Network error or server not responding');
  }
};

export const fetchNewsByCountry = async (countryCode, page = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(`/country/${countryCode}`, {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching news for country ${countryCode}:`, error);
    throw error.response ? error.response.data : new Error('Network error or server not responding');
  }
};