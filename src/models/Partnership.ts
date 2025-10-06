import mongoose, { Document, Schema } from 'mongoose';

export interface IPartnership extends Document {
  // Company Information
  companyName?: string;
  businessType: 'individual' | 'consultancy' | 'agency' | 'institution' | 'other';
  businessRegistrationNumber?: string;
  businessLicense?: string;
  website?: string;
  yearsInBusiness: number;
  
  // Contact Information
  contactPerson: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Business Details
  partnershipType: 'individual_agent' | 'company';
  targetCountries: string[];
  currentClients: number;
  monthlyTarget: number;
  experience: string;
  currentPartners?: string[];
  
  // Financial Information
  annualRevenue?: string;
  investmentCapacity: string;
  expectedCommission: string;
  
  // Marketing & Network
  marketingChannels: string[];
  socialMediaPresence: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  localNetwork: string;
  referralSources: string[];
  
  // Documents
  documents: {
    businessLicense?: string;
    taxCertificate?: string;
    bankStatement?: string;
    identityProof?: string;
    portfolio?: string;
  };
  
  // Additional Information
  motivation: string;
  expectations: string;
  additionalInfo?: string;
  
  // Status & Management
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'on_hold';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  reviewNotes?: string;
  followUpDate?: Date;
  
  // System Fields
  source: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartnershipSchema = new Schema<IPartnership>({
  // Company Information
  companyName: {
    type: String,
    required: false,
    trim: true
  },
  businessType: {
    type: String,
    enum: ['individual', 'consultancy', 'agency', 'institution', 'other'],
    required: true
  },
  businessRegistrationNumber: {
    type: String,
    trim: true
  },
  businessLicense: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  yearsInBusiness: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Contact Information
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  alternatePhone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  
  // Business Details
  partnershipType: {
    type: String,
    enum: ['individual_agent', 'company'],
    required: true
  },
  targetCountries: [{
    type: String,
    trim: true
  }],
  currentClients: {
    type: Number,
    required: true,
    min: 0
  },
  monthlyTarget: {
    type: Number,
    required: true,
    min: 0
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  currentPartners: [{
    type: String,
    trim: true
  }],
  
  // Financial Information
  annualRevenue: {
    type: String,
    trim: true
  },
  investmentCapacity: {
    type: String,
    required: true,
    trim: true
  },
  expectedCommission: {
    type: String,
    required: true,
    trim: true
  },
  
  // Marketing & Network
  marketingChannels: [{
    type: String,
    trim: true
  }],
  socialMediaPresence: {
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    youtube: { type: String, trim: true }
  },
  localNetwork: {
    type: String,
    required: true,
    trim: true
  },
  referralSources: [{
    type: String,
    trim: true
  }],
  
  // Documents
  documents: {
    businessLicense: { type: String, trim: true },
    taxCertificate: { type: String, trim: true },
    bankStatement: { type: String, trim: true },
    identityProof: { type: String, trim: true },
    portfolio: { type: String, trim: true }
  },
  
  // Additional Information
  motivation: {
    type: String,
    required: true,
    trim: true
  },
  expectations: {
    type: String,
    required: true,
    trim: true
  },
  additionalInfo: {
    type: String,
    trim: true
  },
  
  // Status & Management
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'on_hold'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  reviewNotes: {
    type: String,
    trim: true
  },
  followUpDate: {
    type: Date
  },
  
  // System Fields
  source: {
    type: String,
    required: true,
    trim: true,
    default: 'website'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
PartnershipSchema.index({ email: 1 });
PartnershipSchema.index({ status: 1 });
PartnershipSchema.index({ partnershipType: 1 });
PartnershipSchema.index({ country: 1 });
PartnershipSchema.index({ createdAt: -1 });
PartnershipSchema.index({ priority: 1 });

export default mongoose.models.Partnership || mongoose.model<IPartnership>('Partnership', PartnershipSchema);
