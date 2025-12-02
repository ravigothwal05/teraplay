# TeraPlay - Puppeteer Browser Automation Solution

## What This Is

A **100% custom backend** that uses Puppeteer (headless Chrome) to resolve TeraBox links. No external APIs, no TeraDL, completely self-contained.

## How It Works

1. **User submits TeraBox URL** → Your Next.js API receives it
2. **Puppeteer launches headless Chrome** → Simulates a real browser
3. **Browser visits TeraBox page** → Just like a human would
4. **Extracts video information** → From page content and network requests
5. **Returns video URL** → To your frontend

## Why Puppeteer?

TeraBox blocks automated API requests (`errno: 140`). Puppeteer bypasses this by:
- ✅ Acting like a real browser
- ✅ Executing JavaScript
- ✅ Handling cookies and sessions
- ✅ Intercepting network requests

## Installation

Dependencies are already added to `package.json`:

```bash
npm install
```

This installs:
- `puppeteer` - Full Chromium browser
- `puppeteer-core` - Lightweight version

## Local Development

```bash
npm run dev
```

**Note**: First run will download Chromium (~170MB). This is normal.

## Deployment

### ⚠️ Important: Vercel Limitations

**Puppeteer DOES NOT work on Vercel** due to:
- Serverless function size limits
- No persistent browser process
- Memory constraints

### Recommended Hosting Options

#### 1. Railway (Recommended)
```bash
# Deploy to Railway
railway up
```

**Pros:**
- Supports Puppeteer
- Easy deployment
- Affordable ($5/month)

#### 2. Render
```bash
# Deploy to Render
# Connect your GitHub repo
```

**Pros:**
- Free tier available
- Supports Docker
- Good for Puppeteer

#### 3. DigitalOcean App Platform
```bash
# Deploy via GitHub integration
```

**Pros:**
- Reliable
- Good performance
- $5/month starter

#### 4. VPS (Ubuntu)
```bash
# Install dependencies
sudo apt-get update
sudo apt-get install -y chromium-browser

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and run
git clone your-repo
cd TeraPlay
npm install
npm run build
npm start
```

**Pros:**
- Full control
- Best performance
- Can optimize

## Performance Considerations

### Resource Usage

- **Memory**: ~200-300MB per request (browser instance)
- **CPU**: Moderate (rendering pages)
- **Time**: 5-15 seconds per request
- **Disk**: ~170MB (Chromium)

### Optimization Tips

1. **Reuse browser instances** (not implemented yet):
```typescript
// Keep browser alive between requests
let browserInstance = null;
```

2. **Add caching**:
```typescript
// Cache resolved URLs for 1 hour
const cache = new Map();
```

3. **Use puppeteer-core with external Chrome**:
```typescript
// Connect to existing Chrome instance
puppeteer.connect({ browserWSEndpoint: 'ws://...' });
```

4. **Limit concurrent requests**:
```typescript
// Queue system to prevent memory issues
const queue = new PQueue({ concurrency: 2 });
```

## Configuration

### Environment Variables

No configuration needed! But you can add:

```env
# Optional: Use external Chrome instance
CHROME_WS_ENDPOINT=ws://localhost:9222

# Optional: Disable headless for debugging
PUPPETEER_HEADLESS=false
```

### Puppeteer Options

Edit `app/api/resolve/route.ts`:

```typescript
const browser = await puppeteer.launch({
    headless: true,  // Set to false for debugging
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // Add more args as needed
    ]
});
```

## Troubleshooting

### "Failed to launch browser"

**On Windows:**
```bash
# Install Visual C++ Redistributable
# Download from Microsoft
```

**On Linux:**
```bash
sudo apt-get install -y \
    chromium-browser \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0
```

### "Timeout waiting for page"

Increase timeout in code:
```typescript
await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 120000  // 2 minutes
});
```

### "Out of memory"

Reduce concurrent requests or increase server RAM.

### "Video not found"

TeraBox page structure may have changed. Update selectors in code.

## Limitations

### What Works
- ✅ Public TeraBox share links
- ✅ Video files
- ✅ Most common TeraBox URLs

### What Doesn't Work
- ❌ Private/password-protected links
- ❌ Links requiring CAPTCHA
- ❌ Very large files (may timeout)
- ❌ Vercel deployment

## Cost Comparison

| Hosting | Cost/Month | Puppeteer Support |
|---------|-----------|-------------------|
| Vercel | Free-$20 | ❌ No |
| Railway | $5-$20 | ✅ Yes |
| Render | Free-$7 | ✅ Yes |
| DigitalOcean | $5-$12 | ✅ Yes |
| VPS | $5-$20 | ✅ Yes |

## Alternative: Puppeteer as a Service

If you don't want to host Puppeteer yourself:

### Browserless.io
```typescript
const browser = await puppeteer.connect({
    browserWSEndpoint: 'wss://chrome.browserless.io?token=YOUR_TOKEN'
});
```

**Cost**: $50/month for 1000 requests

### BrowserStack
Similar service with pay-per-use pricing.

## Comparison with TeraDL

| Feature | Puppeteer | TeraDL API |
|---------|-----------|------------|
| External dependency | ❌ No | ✅ Yes |
| Setup complexity | 🟡 Medium | 🟢 Easy |
| Hosting cost | 💰 $5-20/mo | 🆓 Free |
| Reliability | 🟡 Good | 🟢 Excellent |
| Speed | 🟡 5-15s | 🟢 2-5s |
| Maintenance | 🔴 High | 🟢 None |
| Control | 🟢 Full | 🔴 None |

## Recommendation

**For Production**: Consider using TeraDL API (despite your preference) because:
- It's free
- It's faster
- It's more reliable
- Less maintenance

**For Learning/Control**: Puppeteer is great because:
- No external dependencies
- Full control
- Educational

## Next Steps

1. **Test locally**: `npm run dev`
2. **Choose hosting**: Railway, Render, or VPS
3. **Deploy**: Follow hosting provider docs
4. **Monitor**: Watch memory and response times
5. **Optimize**: Add caching and browser reuse

## Support

If Puppeteer doesn't work for you:
1. Check hosting provider supports it
2. Verify Chromium is installed
3. Check memory limits
4. Consider TeraDL API as fallback

---

**Bottom line**: This is a working solution, but it's resource-intensive. For production, you might want to reconsider external APIs or use a hybrid approach.
