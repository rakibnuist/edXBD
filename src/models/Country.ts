import mongoose, { Document, Schema } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  slug: string;
  flag: string;
  description: string;
  universities: string[];
  programs: string[];
  requirements: {
    language: string[];
    documents: string[];
    visa: string[];
  };
  costs: {
    tuition: string;
    living: string;
    currency: string;
  };
  scholarships: string[];
  isActive: boolean;
  featured: boolean;
  images: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CountrySchema = new Schema<ICountry>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  flag: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  universities: [{
    type: String,
    trim: true
  }],
  programs: [{
    type: String,
    trim: true
  }],
  requirements: {
    language: [{
      type: String,
      trim: true
    }],
    documents: [{
      type: String,
      trim: true
    }],
    visa: [{
      type: String,
      trim: true
    }]
  },
  costs: {
    tuition: {
      type: String,
      required: true,
      trim: true
    },
    living: {
      type: String,
      required: true,
      trim: true
    },
    currency: {
      type: String,
      required: true,
      trim: true
    }
  },
  scholarships: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String,
    trim: true
  }],
  metaTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
// Note: slug index is automatically created due to unique: true
CountrySchema.index({ isActive: 1, featured: -1 });
CountrySchema.index({ name: 1 });

export default mongoose.models.Country || mongoose.model<ICountry>('Country', CountrySchema);
