#!/bin/bash

echo "🚀 Starting deployment process..."

# Step 1: Deploy Backend to Vercel
echo "📦 Deploying backend to Vercel..."
cd backend
vercel --prod

# Get backend URL from Vercel
BACKEND_URL=$(vercel ls 2>/dev/null | grep "ai-virtual-assistant" | head -1 | awk '{print $2}')

echo "🔗 Backend deployed at: $BACKEND_URL"

# Step 2: Update frontend environment
echo "⚙️  Updating frontend configuration..."
cd ../frontend

# Create .env.production file
cat > .env.production << EOF
VITE_API_URL=$BACKEND_URL
EOF

# Step 3: Deploy Frontend to Vercel
echo "🎨 Deploying frontend to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Frontend: https://ai-virtual-assistant-virid.vercel.app"
echo "🔧 Backend: $BACKEND_URL"
