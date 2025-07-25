import React, { useState } from 'react';
import { Contact } from '../../types';
import { useOpenAI } from '../../services/openaiService';
import { 
  Mail, 
  Phone, 
  Building, 
  User, 
  BarChart, 
  Zap, 
  Clock, 
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Tag,
  Target,
  Brain
} from 'lucide-react';
import Avatar from 'react-avatar';
import AgentModal from '../shared/AgentModal';

interface AIEnhancedContactCardProps {
  contact: Contact;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  showAnalyzeButton?: boolean;
}

const AIEnhancedContactCard: React.FC<AIEnhancedContactCardProps> = ({
  contact,
  isSelected = false,
  onSelect,
  onClick,
  showAnalyzeButton = true
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(contact.score || null);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [scoreChange, setScoreChange] = useState<'up' | 'down' | 'none'>('none');
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  
  const openai = useOpenAI();
  
  // Analyze contact with AI
  const handleAnalyzeContact = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setIsAnalyzing(true);
    
    try {
      // Get previous score if any
      const prevScore = aiScore;
      
      // Call the OpenAI service to predict lead score
      const result = await openai.predictLeadScore(contact);
      
      // Extract score from result - in a real implementation, you would parse the response
      // Here we'll simulate a score change
      const newScore = contact.score || Math.floor(Math.random() * 40) + 60; // 60-100
      
      // Set the AI score
      setAiScore(newScore);
      
      // Determine score trend
      if (prevScore && newScore > prevScore) {
        setScoreChange('up');
      } else if (prevScore && newScore < prevScore) {
        setScoreChange('down');
      } else {
        setScoreChange('none');
      }
      
      // Set AI insights
      setAiInsights(result);
    } catch (error) {
      console.error('Error analyzing contact:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Format score for display
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Get trend indicator
  const getTrendIcon = () => {
    if (scoreChange === 'up') return <ArrowUp size={16} className="text-green-500" />;
    if (scoreChange === 'down') return <ArrowDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-500" />;
  };
  
  // Get contact status indicator
  const getStatusIndicator = (status: string) => {
    const statusColors: Record<string, string> = {
      'lead': 'bg-blue-100 text-blue-800',
      'prospect': 'bg-purple-100 text-purple-800',
      'customer': 'bg-green-100 text-green-800',
      'churned': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Last contact indicator
  const getLastContactIndicator = (date?: Date) => {
    if (!date) return null;
    
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      return <AlertCircle size={16} className="text-red-500 mr-1" />;
    } else if (diffDays > 14) {
      return <Clock size={16} className="text-yellow-500 mr-1" />;
    }
    return <CheckCircle size={16} className="text-green-500 mr-1" />;
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all hover:border-blue-300 hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        {/* Contact info */}
        <div className="flex-1">
          <div className="flex items-start space-x-3">
            {onSelect && (
              <div className="pt-1">
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={(e) => {
                    e.stopPropagation();
                    if (onSelect) onSelect();
                  }}
                  className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">{contact.name}</h3>
              
              <div className="mt-1 flex flex-wrap gap-2">
                {contact.status && getStatusIndicator(contact.status)}
                
                {contact.industry && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 flex items-center">
                    <Tag size={12} className="mr-1" />
                    {contact.industry}
                  </span>
                )}
              </div>
              
              <div className="mt-2 space-y-1">
                {contact.position && contact.company && (
                  <div className="flex items-center text-sm">
                    <Building size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{contact.position} at {contact.company}</span>
                  </div>
                )}
                
                {contact.email && (
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{contact.email}</span>
                  </div>
                )}
                
                {contact.phone && (
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">{contact.phone}</span>
                  </div>
                )}
                
                {contact.lastContact && (
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      Last contacted: {contact.lastContact.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Score */}
        <div>
          {aiScore !== null ? (
            <div className="flex flex-col items-center">
              <div className={`h-12 w-12 rounded-full ${getScoreColor(aiScore)} text-white flex items-center justify-center font-bold text-lg transition-all duration-200`}>
                {aiScore}
              </div>
              <div className="flex items-center mt-1 text-xs">
                {getTrendIcon()}
                <span className="ml-1">AI Score</span>
              </div>
            </div>
          ) : (
            showAnalyzeButton && (
              <button 
                onClick={handleAnalyzeContact} 
                disabled={isAnalyzing}
                className="flex items-center justify-center p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700"
              >
                {isAnalyzing ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <Zap size={20} />
                )}
              </button>
            )
          )}
        </div>
      </div>
      
      {/* AI Insights */}
      {aiInsights && (
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-900 flex items-center">
              <BarChart size={16} className="mr-2 text-blue-500" />
              AI Insights
            </h4>
            <div className="flex space-x-1">
              <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">
                <ThumbsUp size={14} />
              </button>
              <button className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">
                <ThumbsDown size={14} />
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
            {aiInsights}
          </div>
        </div>
      )}
      
      {/* Agent Buttons */}
      <div className="mt-4 pt-2 border-t border-gray-100">
        <div className="flex space-x-2">
          <button 
            className="flex-1 flex items-center justify-center py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setActiveAgent('lead-enrichment');
            }}
          >
            <Brain size={14} className="mr-1" /> Enrich Lead
          </button>
          <button 
            className="flex-1 flex items-center justify-center py-1 bg-purple-50 text-purple-600 rounded hover:bg-purple-100 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setActiveAgent('ai-sdr');
            }}
          >
            <Target size={14} className="mr-1" /> SDR Sequence
          </button>
          <button 
            className="flex-1 flex items-center justify-center py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 text-xs font-medium"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `tel:${contact.phone?.replace(/\D/g, '')}`;
            }}
          >
            <Phone size={14} className="mr-1" /> Call
          </button>
        </div>
      </div>

      {/* Agent Modal */}
      {activeAgent && (
        <AgentModal
          agentId={activeAgent}
          data={contact}
          onClose={() => setActiveAgent(null)}
        />
      )}
    </div>
  );
};

export default AIEnhancedContactCard;