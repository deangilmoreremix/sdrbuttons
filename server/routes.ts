import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBusinessAnalyzerSchema, 
  insertContentItemSchema, 
  insertVoiceProfileSchema, 
  insertImageAssetSchema,
  insertDealSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Business Analyzer Routes
  app.get("/api/business-analyzer", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const analyses = await storage.getBusinessAnalyses(userId);
      res.json({ data: analyses, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  app.post("/api/business-analyzer", async (req, res) => {
    try {
      const validatedData = insertBusinessAnalyzerSchema.parse(req.body);
      const analysis = await storage.createBusinessAnalysis(validatedData);
      res.json({ data: analysis, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.patch("/api/business-analyzer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await storage.updateBusinessAnalysis(id, req.body);
      res.json({ data: analysis, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.delete("/api/business-analyzer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBusinessAnalysis(id);
      res.json({ error: null });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Content Items Routes
  app.get("/api/content-items", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const items = await storage.getContentItems(userId);
      res.json({ data: items, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  app.post("/api/content-items", async (req, res) => {
    try {
      const validatedData = insertContentItemSchema.parse(req.body);
      const item = await storage.createContentItem(validatedData);
      res.json({ data: item, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.patch("/api/content-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.updateContentItem(id, req.body);
      res.json({ data: item, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.delete("/api/content-items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteContentItem(id);
      res.json({ error: null });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Voice Profiles Routes
  app.get("/api/voice-profiles", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const profiles = await storage.getVoiceProfiles(userId);
      res.json({ data: profiles, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  app.post("/api/voice-profiles", async (req, res) => {
    try {
      const validatedData = insertVoiceProfileSchema.parse(req.body);
      const profile = await storage.createVoiceProfile(validatedData);
      res.json({ data: profile, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.patch("/api/voice-profiles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await storage.updateVoiceProfile(id, req.body);
      res.json({ data: profile, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.delete("/api/voice-profiles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteVoiceProfile(id);
      res.json({ error: null });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Image Assets Routes
  app.get("/api/image-assets", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const assets = await storage.getImageAssets(userId);
      res.json({ data: assets, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  app.post("/api/image-assets", async (req, res) => {
    try {
      const validatedData = insertImageAssetSchema.parse(req.body);
      const asset = await storage.createImageAsset(validatedData);
      res.json({ data: asset, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.patch("/api/image-assets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const asset = await storage.updateImageAsset(id, req.body);
      res.json({ data: asset, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.delete("/api/image-assets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteImageAsset(id);
      res.json({ error: null });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Deal Routes
  app.get("/api/deals", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const deals = await storage.getDeals(userId);
      res.json({ data: deals, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  app.get("/api/deals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deal = await storage.getDeal(id);
      res.json({ data: deal, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  app.post("/api/deals", async (req, res) => {
    try {
      const validatedData = insertDealSchema.parse(req.body);
      const deal = await storage.createDeal(validatedData);
      res.json({ data: deal, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.patch("/api/deals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deal = await storage.updateDeal(id, req.body);
      res.json({ data: deal, error: null });
    } catch (error) {
      res.status(400).json({ data: null, error: error.message });
    }
  });

  app.delete("/api/deals/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDeal(id);
      res.json({ error: null });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/deals/stage/:stage", async (req, res) => {
    try {
      const { stage } = req.params;
      const userId = req.query.userId as string;
      const deals = await storage.getDealsByStage(userId, stage);
      res.json({ data: deals, error: null });
    } catch (error) {
      res.status(500).json({ data: null, error: error.message });
    }
  });

  // Edge Function equivalents - AI services
  app.post("/api/ai/analyze-business", async (req, res) => {
    try {
      // This would replace the Supabase Edge Function
      // For now, returning a structured response
      res.json({ 
        analysis: "Business analysis would be generated here using AI services",
        recommendations: [],
        insights: []
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/generate-content", async (req, res) => {
    try {
      // This would replace content generation Edge Functions
      res.json({ 
        content: "Generated content would be returned here",
        metadata: {}
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
