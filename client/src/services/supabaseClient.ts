// Migrated from Supabase to Replit API Service
import { useApiStore } from '../store/apiStore';
import * as apiService from './apiService';

// No longer need Supabase client - using direct API calls instead

// Helper to validate UUID format
const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Authentication helpers - now using API service
const signIn = async (email: string, password: string) => {
  // This would be implemented with the actual authentication system
  return { data: null, error: null };
};

const signUp = async (email: string, password: string) => {
  // This would be implemented with the actual authentication system
  return { data: null, error: null };
};

const signOut = async () => {
  // This would be implemented with the actual authentication system
  return { error: null };
};

export const getCurrentUser = async () => {
  return await apiService.getCurrentUser();
};

const getSession = async () => {
  return await apiService.getSession();
};

// Database helper functions - now using API service
export const fetchBusinessAnalysis = async (userId?: string) => {
  try {
    return await apiService.fetchBusinessAnalysis(userId);
  } catch (err) {
    console.error("Error fetching business analyses:", err);
    return { data: null, error: err };
  }
};

export const createBusinessAnalysis = async (analysisData: any) => {
  try {
    return await apiService.createBusinessAnalysis(analysisData);
  } catch (err) {
    console.error("Error creating business analysis:", err);
    return { data: null, error: err };
  }
};

const updateBusinessAnalysis = async (id: string, analysisData: any) => {
  try {
    return await apiService.updateBusinessAnalysis(id, analysisData);
  } catch (err) {
    console.error("Error updating business analysis:", err);
    return { data: null, error: err };
  }
};

const deleteBusinessAnalysis = async (id: string) => {
  try {
    await apiService.deleteBusinessAnalysis(id);
    return { error: null };
  } catch (err) {
    console.error("Error deleting business analysis:", err);
    return { error: err };
  }
};

// Content Items - now using API service
export const fetchContentItems = async (userId?: string) => {
  try {
    return await apiService.fetchContentItems(userId);
  } catch (err) {
    console.error("Error fetching content items:", err);
    return { data: null, error: err };
  }
};

export const createContentItem = async (contentData: any) => {
  try {
    return await apiService.createContentItem(contentData);
  } catch (err) {
    console.error("Error creating content item:", err);
    return { data: null, error: err };
  }
};

const updateContentItem = async (id: string, contentData: any) => {
  try {
    return await apiService.updateContentItem(id, contentData);
  } catch (err) {
    console.error("Error updating content item:", err);
    return { data: null, error: err };
  }
};

export const deleteContentItem = async (id: string) => {
  try {
    await apiService.deleteContentItem(id);
    return { error: null };
  } catch (err) {
    console.error("Error deleting content item:", err);
    return { error: err };
  }
};

// Voice Profiles - now using API service
export const fetchVoiceProfiles = async (userId?: string) => {
  try {
    return await apiService.fetchVoiceProfiles(userId);
  } catch (err) {
    console.error("Error fetching voice profiles:", err);
    return { data: null, error: err };
  }
};

export const createVoiceProfile = async (profileData: any) => {
  try {
    return await apiService.createVoiceProfile(profileData);
  } catch (err) {
    console.error("Error creating voice profile:", err);
    return { data: null, error: err };
  }
};

export const updateVoiceProfile = async (id: string, profileData: any) => {
  try {
    return await apiService.updateVoiceProfile(id, profileData);
  } catch (err) {
    console.error("Error updating voice profile:", err);
    return { data: null, error: err };
  }
};

export const deleteVoiceProfile = async (id: string) => {
  try {
    await apiService.deleteVoiceProfile(id);
    return { error: null };
  } catch (err) {
    console.error("Error deleting voice profile:", err);
    return { error: err };
  }
};

// Image Assets - now using API service
const fetchImageAssets = async (userId?: string) => {
  try {
    return await apiService.fetchImageAssets(userId);
  } catch (err) {
    console.error("Error fetching image assets:", err);
    return { data: null, error: err };
  }
};

const createImageAsset = async (assetData: any) => {
  try {
    return await apiService.createImageAsset(assetData);
  } catch (err) {
    console.error("Error creating image asset:", err);
    return { data: null, error: err };
  }
};

const updateImageAsset = async (id: string, assetData: any) => {
  try {
    return await apiService.updateImageAsset(id, assetData);
  } catch (err) {
    console.error("Error updating image asset:", err);
    return { data: null, error: err };
  }
};

const deleteImageAsset = async (id: string) => {
  try {
    await apiService.deleteImageAsset(id);
    return { error: null };
  } catch (err) {
    console.error("Error deleting image asset:", err);
    return { error: err };
  }
};

// Edge Function Helpers - now using API service
export const callEdgeFunction = async (functionName: string, payload: any) => {
  try {
    return await apiService.callAIService(functionName, payload);
  } catch (error) {
    console.error(`Error calling AI service ${functionName}:`, error);
    throw error;
  }
};