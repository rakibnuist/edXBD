# Contributing to EduExpress International

Thank you for your interest in contributing to EduExpress International! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Git
- npm or yarn

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/edXBD.git
   cd edXBD
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables in `.env.local`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow **ESLint** rules and fix any linting errors
- Use **Prettier** for code formatting
- Follow **Next.js** best practices

### Component Guidelines
- Use **functional components** with hooks
- Implement **proper TypeScript types**
- Add **JSDoc comments** for complex functions
- Ensure **mobile responsiveness**

### File Naming
- Use **PascalCase** for components: `Header.tsx`
- Use **camelCase** for utilities: `apiUtils.ts`
- Use **kebab-case** for pages: `study-abroad.tsx`

### Git Workflow
1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Test your changes thoroughly
4. Commit with descriptive messages
5. Push to your fork
6. Create a Pull Request

### Commit Messages
Use conventional commit format:
```
feat: add mobile optimization for contact form
fix: resolve navigation menu accessibility issue
docs: update README with new features
style: improve button hover animations
refactor: optimize image loading performance
```

## 🧪 Testing

### Manual Testing
- Test on multiple devices and browsers
- Verify mobile responsiveness
- Check accessibility with screen readers
- Test form submissions and API endpoints

### Performance Testing
- Run Lighthouse audits
- Check Core Web Vitals
- Test loading performance on slow networks

## 📱 Mobile Development

### Mobile-First Approach
- Design for mobile devices first
- Use responsive design principles
- Ensure touch targets are at least 44px
- Test on real devices when possible

### Mobile-Specific Features
- Touch interactions and gestures
- Mobile-optimized forms
- Progressive Web App features
- Offline functionality where appropriate

## 🔒 Security Guidelines

### Data Protection
- Never commit sensitive data
- Use environment variables for secrets
- Validate all user inputs
- Implement proper authentication

### Best Practices
- Use HTTPS in production
- Implement rate limiting
- Sanitize user inputs
- Follow OWASP guidelines

## 📊 Performance Guidelines

### Optimization
- Optimize images and assets
- Implement lazy loading
- Use code splitting
- Minimize bundle size

### Monitoring
- Track Core Web Vitals
- Monitor API response times
- Use performance profiling tools
- Implement error tracking

## 🎨 UI/UX Guidelines

### Design System
- Follow the established color scheme
- Use consistent typography
- Maintain proper spacing
- Ensure accessibility compliance

### User Experience
- Focus on user needs
- Implement intuitive navigation
- Provide clear feedback
- Optimize for conversion

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex logic
- Update README for new features
- Maintain API documentation

### User Documentation
- Keep user-facing documentation updated
- Provide clear instructions
- Include screenshots where helpful
- Maintain changelog

## 🐛 Bug Reports

### Reporting Issues
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or videos if applicable
- Browser and device information

### Issue Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. iOS, Android, Windows, macOS]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]

**Additional Context**
Any other context about the problem.
```

## ✨ Feature Requests

### Suggesting Features
When suggesting features:
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Think about user impact

### Feature Template
```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context about the feature request.
```

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Mobile responsiveness verified

### Pull Request Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested on multiple browsers
- [ ] Accessibility verified

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: info@eduexpressint.com for business inquiries

### Code Review Process
- All PRs require review
- Address feedback promptly
- Be respectful and constructive
- Ask questions if unclear

## 🏆 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Thank You

Thank you for contributing to EduExpress International! Your efforts help students achieve their international education dreams.

---

**Questions?** Feel free to open an issue or contact us at info@eduexpressint.com
