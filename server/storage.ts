import { 
  users, 
  deals,
  type User, 
  type InsertUser, 
  type BusinessAnalyzer, 
  type InsertBusinessAnalyzer, 
  type ContentItem, 
  type InsertContentItem, 
  type VoiceProfile, 
  type InsertVoiceProfile, 
  type ImageAsset, 
  type InsertImageAsset,
  type Deal,
  type InsertDeal
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Business Analyzer
  getBusinessAnalyses(userId?: string): Promise<BusinessAnalyzer[]>;
  createBusinessAnalysis(analysis: InsertBusinessAnalyzer): Promise<BusinessAnalyzer>;
  updateBusinessAnalysis(id: string, analysis: Partial<InsertBusinessAnalyzer>): Promise<BusinessAnalyzer>;
  deleteBusinessAnalysis(id: string): Promise<void>;
  
  // Content Items
  getContentItems(userId?: string): Promise<ContentItem[]>;
  createContentItem(item: InsertContentItem): Promise<ContentItem>;
  updateContentItem(id: string, item: Partial<InsertContentItem>): Promise<ContentItem>;
  deleteContentItem(id: string): Promise<void>;
  
  // Voice Profiles
  getVoiceProfiles(userId?: string): Promise<VoiceProfile[]>;
  createVoiceProfile(profile: InsertVoiceProfile): Promise<VoiceProfile>;
  updateVoiceProfile(id: string, profile: Partial<InsertVoiceProfile>): Promise<VoiceProfile>;
  deleteVoiceProfile(id: string): Promise<void>;
  
  // Image Assets
  getImageAssets(userId?: string): Promise<ImageAsset[]>;
  createImageAsset(asset: InsertImageAsset): Promise<ImageAsset>;
  updateImageAsset(id: string, asset: Partial<InsertImageAsset>): Promise<ImageAsset>;
  deleteImageAsset(id: string): Promise<void>;
  
  // Deals
  getDeals(userId?: string): Promise<Deal[]>;
  getDeal(id: string): Promise<Deal | undefined>;
  createDeal(deal: InsertDeal): Promise<Deal>;
  updateDeal(id: string, deal: Partial<InsertDeal>): Promise<Deal>;
  deleteDeal(id: string): Promise<void>;
  getDealsByStage(userId: string, stage: string): Promise<Deal[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private businessAnalyses: Map<string, BusinessAnalyzer>;
  private contentItems: Map<string, ContentItem>;
  private voiceProfiles: Map<string, VoiceProfile>;
  private imageAssets: Map<string, ImageAsset>;
  private deals: Map<string, Deal>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.businessAnalyses = new Map();
    this.contentItems = new Map();
    this.voiceProfiles = new Map();
    this.imageAssets = new Map();
    this.deals = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Business Analyzer Methods
  async getBusinessAnalyses(userId?: string): Promise<BusinessAnalyzer[]> {
    const analyses = Array.from(this.businessAnalyses.values());
    return userId ? analyses.filter(a => a.userId === userId) : analyses;
  }

  async createBusinessAnalysis(analysis: InsertBusinessAnalyzer): Promise<BusinessAnalyzer> {
    const id = crypto.randomUUID();
    const newAnalysis: BusinessAnalyzer = {
      ...analysis,
      id,
      status: analysis.status || "pending",
      businessName: analysis.businessName || null,
      industry: analysis.industry || null,
      analysisData: analysis.analysisData || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.businessAnalyses.set(id, newAnalysis);
    return newAnalysis;
  }

  async updateBusinessAnalysis(id: string, analysis: Partial<InsertBusinessAnalyzer>): Promise<BusinessAnalyzer> {
    const existing = this.businessAnalyses.get(id);
    if (!existing) throw new Error('Business analysis not found');
    
    const updated = { ...existing, ...analysis, updatedAt: new Date() };
    this.businessAnalyses.set(id, updated);
    return updated;
  }

  async deleteBusinessAnalysis(id: string): Promise<void> {
    this.businessAnalyses.delete(id);
  }

  // Content Items Methods
  async getContentItems(userId?: string): Promise<ContentItem[]> {
    const items = Array.from(this.contentItems.values());
    return userId ? items.filter(i => i.userId === userId) : items;
  }

  async createContentItem(item: InsertContentItem): Promise<ContentItem> {
    const id = crypto.randomUUID();
    const newItem: ContentItem = {
      ...item,
      id,
      status: item.status || "draft",
      type: item.type || null,
      content: item.content || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contentItems.set(id, newItem);
    return newItem;
  }

  async updateContentItem(id: string, item: Partial<InsertContentItem>): Promise<ContentItem> {
    const existing = this.contentItems.get(id);
    if (!existing) throw new Error('Content item not found');
    
    const updated = { ...existing, ...item, updatedAt: new Date() };
    this.contentItems.set(id, updated);
    return updated;
  }

  async deleteContentItem(id: string): Promise<void> {
    this.contentItems.delete(id);
  }

  // Voice Profiles Methods
  async getVoiceProfiles(userId?: string): Promise<VoiceProfile[]> {
    const profiles = Array.from(this.voiceProfiles.values());
    return userId ? profiles.filter(p => p.userId === userId) : profiles;
  }

  async createVoiceProfile(profile: InsertVoiceProfile): Promise<VoiceProfile> {
    const id = crypto.randomUUID();
    const newProfile: VoiceProfile = {
      ...profile,
      id,
      voiceSettings: profile.voiceSettings || {},
      isActive: profile.isActive || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.voiceProfiles.set(id, newProfile);
    return newProfile;
  }

  async updateVoiceProfile(id: string, profile: Partial<InsertVoiceProfile>): Promise<VoiceProfile> {
    const existing = this.voiceProfiles.get(id);
    if (!existing) throw new Error('Voice profile not found');
    
    const updated = { ...existing, ...profile, updatedAt: new Date() };
    this.voiceProfiles.set(id, updated);
    return updated;
  }

  async deleteVoiceProfile(id: string): Promise<void> {
    this.voiceProfiles.delete(id);
  }

  // Image Assets Methods
  async getImageAssets(userId?: string): Promise<ImageAsset[]> {
    const assets = Array.from(this.imageAssets.values());
    return userId ? assets.filter(a => a.userId === userId) : assets;
  }

  async createImageAsset(asset: InsertImageAsset): Promise<ImageAsset> {
    const id = crypto.randomUUID();
    const newAsset: ImageAsset = {
      ...asset,
      id,
      type: asset.type || null,
      size: asset.size || null,
      createdAt: new Date(),
    };
    this.imageAssets.set(id, newAsset);
    return newAsset;
  }

  async updateImageAsset(id: string, asset: Partial<InsertImageAsset>): Promise<ImageAsset> {
    const existing = this.imageAssets.get(id);
    if (!existing) throw new Error('Image asset not found');
    
    const updated = { ...existing, ...asset };
    this.imageAssets.set(id, updated);
    return updated;
  }

  async deleteImageAsset(id: string): Promise<void> {
    this.imageAssets.delete(id);
  }

  // Deal Methods
  async getDeals(userId?: string): Promise<Deal[]> {
    const deals = Array.from(this.deals.values());
    return userId ? deals.filter(d => d.userId === userId) : deals;
  }

  async getDeal(id: string): Promise<Deal | undefined> {
    return this.deals.get(id);
  }

  async createDeal(deal: InsertDeal): Promise<Deal> {
    const id = crypto.randomUUID();
    const newDeal: Deal = {
      ...deal,
      id,
      value: deal.value || 0,
      stage: deal.stage || 'qualification',
      probability: deal.probability || 0,
      daysInStage: deal.daysInStage || 0,
      priority: deal.priority || 'medium',
      company: deal.company || null,
      contact: deal.contact || null,
      dueDate: deal.dueDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.deals.set(id, newDeal);
    return newDeal;
  }

  async updateDeal(id: string, deal: Partial<InsertDeal>): Promise<Deal> {
    const existing = this.deals.get(id);
    if (!existing) throw new Error('Deal not found');
    
    const updated = { ...existing, ...deal, updatedAt: new Date() };
    this.deals.set(id, updated);
    return updated;
  }

  async deleteDeal(id: string): Promise<void> {
    this.deals.delete(id);
  }

  async getDealsByStage(userId: string, stage: string): Promise<Deal[]> {
    const deals = Array.from(this.deals.values());
    return deals.filter(d => d.userId === userId && d.stage === stage);
  }
}

// Database Storage Implementation
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { 
  businessAnalyzer, 
  contentItems, 
  voiceProfiles, 
  imageAssets 
} from "@shared/schema";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Business Analyzer Methods
  async getBusinessAnalyses(userId?: string): Promise<BusinessAnalyzer[]> {
    if (userId) {
      return await db.select().from(businessAnalyzer).where(eq(businessAnalyzer.userId, userId));
    }
    return await db.select().from(businessAnalyzer);
  }

  async createBusinessAnalysis(analysis: InsertBusinessAnalyzer): Promise<BusinessAnalyzer> {
    const result = await db.insert(businessAnalyzer).values(analysis).returning();
    return result[0];
  }

  async updateBusinessAnalysis(id: string, analysis: Partial<InsertBusinessAnalyzer>): Promise<BusinessAnalyzer> {
    const result = await db.update(businessAnalyzer)
      .set({ ...analysis, updatedAt: new Date() })
      .where(eq(businessAnalyzer.id, id))
      .returning();
    if (result.length === 0) throw new Error('Business analysis not found');
    return result[0];
  }

  async deleteBusinessAnalysis(id: string): Promise<void> {
    await db.delete(businessAnalyzer).where(eq(businessAnalyzer.id, id));
  }

  // Content Items Methods
  async getContentItems(userId?: string): Promise<ContentItem[]> {
    if (userId) {
      return await db.select().from(contentItems).where(eq(contentItems.userId, userId));
    }
    return await db.select().from(contentItems);
  }

  async createContentItem(item: InsertContentItem): Promise<ContentItem> {
    const result = await db.insert(contentItems).values(item).returning();
    return result[0];
  }

  async updateContentItem(id: string, item: Partial<InsertContentItem>): Promise<ContentItem> {
    const result = await db.update(contentItems)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(contentItems.id, id))
      .returning();
    if (result.length === 0) throw new Error('Content item not found');
    return result[0];
  }

  async deleteContentItem(id: string): Promise<void> {
    await db.delete(contentItems).where(eq(contentItems.id, id));
  }

  // Voice Profiles Methods
  async getVoiceProfiles(userId?: string): Promise<VoiceProfile[]> {
    if (userId) {
      return await db.select().from(voiceProfiles).where(eq(voiceProfiles.userId, userId));
    }
    return await db.select().from(voiceProfiles);
  }

  async createVoiceProfile(profile: InsertVoiceProfile): Promise<VoiceProfile> {
    const result = await db.insert(voiceProfiles).values(profile).returning();
    return result[0];
  }

  async updateVoiceProfile(id: string, profile: Partial<InsertVoiceProfile>): Promise<VoiceProfile> {
    const result = await db.update(voiceProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(voiceProfiles.id, id))
      .returning();
    if (result.length === 0) throw new Error('Voice profile not found');
    return result[0];
  }

  async deleteVoiceProfile(id: string): Promise<void> {
    await db.delete(voiceProfiles).where(eq(voiceProfiles.id, id));
  }

  // Image Assets Methods
  async getImageAssets(userId?: string): Promise<ImageAsset[]> {
    if (userId) {
      return await db.select().from(imageAssets).where(eq(imageAssets.userId, userId));
    }
    return await db.select().from(imageAssets);
  }

  async createImageAsset(asset: InsertImageAsset): Promise<ImageAsset> {
    const result = await db.insert(imageAssets).values(asset).returning();
    return result[0];
  }

  async updateImageAsset(id: string, asset: Partial<InsertImageAsset>): Promise<ImageAsset> {
    const result = await db.update(imageAssets)
      .set(asset)
      .where(eq(imageAssets.id, id))
      .returning();
    if (result.length === 0) throw new Error('Image asset not found');
    return result[0];
  }

  async deleteImageAsset(id: string): Promise<void> {
    await db.delete(imageAssets).where(eq(imageAssets.id, id));
  }

  // Deal Methods
  async getDeals(userId?: string): Promise<Deal[]> {
    if (userId) {
      return await db.select().from(deals).where(eq(deals.userId, userId));
    }
    return await db.select().from(deals);
  }

  async getDeal(id: string): Promise<Deal | undefined> {
    const result = await db.select().from(deals).where(eq(deals.id, id)).limit(1);
    return result[0];
  }

  async createDeal(deal: InsertDeal): Promise<Deal> {
    const result = await db.insert(deals).values(deal).returning();
    return result[0];
  }

  async updateDeal(id: string, deal: Partial<InsertDeal>): Promise<Deal> {
    const result = await db.update(deals)
      .set({ ...deal, updatedAt: new Date() })
      .where(eq(deals.id, id))
      .returning();
    if (result.length === 0) throw new Error('Deal not found');
    return result[0];
  }

  async deleteDeal(id: string): Promise<void> {
    await db.delete(deals).where(eq(deals.id, id));
  }

  async getDealsByStage(userId: string, stage: string): Promise<Deal[]> {
    return await db.select().from(deals)
      .where(and(eq(deals.userId, userId), eq(deals.stage, stage)));
  }
}

// Use DatabaseStorage in production, MemStorage for development
export const storage = process.env.NODE_ENV === 'production' 
  ? new DatabaseStorage() 
  : new MemStorage();
