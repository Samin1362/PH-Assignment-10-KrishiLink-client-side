# 🎨 Professional Toast Component - Usage Guide

## ✨ **Features**

Your new Toast component is **visually stunning** and **theme-consistent**!

### **🎯 Key Features:**
- ✅ **Success & Error variants** with distinct colors
- ✅ **Auto-dismiss** with customizable duration
- ✅ **Progress bar** showing time remaining
- ✅ **Pause on hover** for better UX
- ✅ **Smooth animations** (slide-in, slide-out, scale)
- ✅ **Multiple toasts** stack beautifully
- ✅ **Manual close button** with hover effect
- ✅ **Theme-consistent** colors (KrishiLink green)
- ✅ **Fully responsive** and accessible
- ✅ **Portal rendering** (appears on top of everything)

---

## 🚀 **Quick Start**

### **Step 1: Add Toast Provider to Your App**

Update your `main.jsx` or `App.jsx`:

```jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useToast, ToastContainer } from "./components/Toast";
import router from "./routes/router";

function App() {
  const { toasts, removeToast, showSuccess, showError } = useToast();

  // Make toast methods available globally (optional)
  window.showToast = {
    success: showSuccess,
    error: showError,
  };

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </AuthProvider>
  );
}

export default App;
```

### **Step 2: Use in Any Component**

```jsx
import { useToast } from "../components/Toast";

const MyComponent = () => {
  const { showSuccess, showError } = useToast();

  const handleSuccess = () => {
    showSuccess("Crop added successfully!");
  };

  const handleError = () => {
    showError("Failed to add crop. Please try again.");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

---

## 📖 **Detailed Usage Examples**

### **Example 1: Form Submission (Add Crop)**

```jsx
import { useToast } from "../components/Toast";
import { cropsAPI } from "../services/api";

const AddCropsPage = () => {
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await cropsAPI.create(cropData, user.email);
      showSuccess("Crop added successfully! 🌾");
      navigate("/my-posts");
    } catch (error) {
      showError(error.message || "Failed to add crop");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
};
```

### **Example 2: Login/Register**

```jsx
const LoginPage = () => {
  const { showSuccess, showError } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      showSuccess("Welcome back! Login successful 👋");
      navigate("/");
    } catch (error) {
      showError("Invalid email or password");
    }
  };

  return <form onSubmit={handleLogin}>{/* ... */}</form>;
};
```

### **Example 3: Delete Operation**

```jsx
const MyPostsPage = () => {
  const { showSuccess, showError } = useToast();

  const handleDelete = async (cropId) => {
    if (!confirm("Are you sure?")) return;
    
    try {
      await cropsAPI.delete(cropId, user.email);
      showSuccess("Crop deleted successfully");
      fetchMyCrops(); // Refresh list
    } catch (error) {
      showError("Failed to delete crop");
    }
  };

  return (
    <button onClick={() => handleDelete(crop._id)}>
      Delete
    </button>
  );
};
```

### **Example 4: Update/Edit**

```jsx
const EditCropPage = () => {
  const { showSuccess, showError } = useToast();

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await cropsAPI.update(id, cropData, user.email);
      showSuccess("Crop updated successfully! ✓");
      navigate(`/crop/${id}`);
    } catch (error) {
      showError("Failed to update crop");
    }
  };

  return <form onSubmit={handleUpdate}>{/* ... */}</form>;
};
```

### **Example 5: Interest Actions**

```jsx
const CropDetailPage = () => {
  const { showSuccess, showError } = useToast();

  const handleSendInterest = async () => {
    try {
      await interestsAPI.add(interestData);
      showSuccess("Interest sent to seller! 📧");
      setShowInterestForm(false);
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <button onClick={handleSendInterest}>
      Send Interest
    </button>
  );
};
```

### **Example 6: Custom Duration**

```jsx
const ProfilePage = () => {
  const { showSuccess, showError } = useToast();

  const handleProfileUpdate = async () => {
    try {
      await usersAPI.update(email, userData);
      // Show toast for 6 seconds instead of default 4
      showSuccess("Profile updated successfully!", 6000);
    } catch (error) {
      showError("Failed to update profile", 5000);
    }
  };
};
```

---

## 🎨 **Design Specifications**

### **Success Toast (Green Theme)**
```
┌──────────────────────────────────┐
│ ✓  Success!                    × │
│    Crop added successfully!      │
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────┘

Colors:
- Border: #4CAF50 (KrishiLink green)
- Icon background: #4CAF50
- Progress bar: #4CAF50
- Text: #1A1A1A
- Background: White
```

### **Error Toast (Red Theme)**
```
┌──────────────────────────────────┐
│ ×  Error!                      × │
│    Failed to add crop            │
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────┘

Colors:
- Border: #EF4444 (Red)
- Icon background: #EF4444
- Progress bar: #EF4444
- Text: #1A1A1A
- Background: White
```

---

## ⚙️ **API Reference**

### **useToast() Hook**

Returns an object with:

| Method | Parameters | Description |
|--------|------------|-------------|
| `showSuccess` | `(message, duration?)` | Show success toast |
| `showError` | `(message, duration?)` | Show error toast |
| `addToast` | `(message, type, duration?)` | Generic toast method |
| `toasts` | Array | Current active toasts |
| `removeToast` | `(id)` | Manually remove a toast |

### **Parameters**

- **message** (string, required): The message to display
- **duration** (number, optional): Auto-dismiss time in milliseconds (default: 4000)
- **type** ("success" | "error", optional): Toast variant (default: "success")

---

## 🎭 **Animations**

### **Entrance: slideInRight**
```
From: Offscreen right (opacity 0, translateX 100%)
To: On screen (opacity 1, translateX 0)
Duration: 0.4s
Easing: Bounce (cubic-bezier)
```

### **Exit: slideOutRight**
```
From: On screen (opacity 1, translateX 0)
To: Offscreen right (opacity 0, translateX 120%)
Duration: 0.3s
Easing: Ease-in
```

### **Icon: scaleIn**
```
From: Scale 0 (invisible)
To: Scale 1 (full size)
Duration: 0.3s
Easing: Bounce
```

---

## 🎯 **Best Practices**

### **✅ DO:**

```jsx
// Clear, concise messages
showSuccess("Crop added successfully!");
showError("Failed to save changes");

// Use for important actions
handleDelete() → showSuccess("Deleted")
handleSubmit() → showSuccess("Saved")

// Provide context
showError("Email already exists. Please use a different email.");

// Use appropriate duration
quickAction() → showSuccess("Saved", 3000)
importantAction() → showSuccess("Account created!", 6000)
```

### **❌ DON'T:**

```jsx
// Too vague
showSuccess("Done");
showError("Error");

// Too long
showSuccess("Your crop has been successfully added to the database and is now visible to all users on the platform...");

// For every minor action
onChange() → showSuccess("Input changed"); // NO!
onHover() → showSuccess("Hovering"); // NO!
```

---

## 🔧 **Advanced Usage**

### **Multiple Toasts**

```jsx
const handleBatchOperation = async () => {
  showSuccess("Starting batch upload...");
  
  for (const item of items) {
    try {
      await upload(item);
      showSuccess(`${item.name} uploaded`);
    } catch (error) {
      showError(`Failed: ${item.name}`);
    }
  }
  
  showSuccess("All uploads complete!", 6000);
};
```

### **Conditional Toast**

```jsx
const handleSave = async () => {
  try {
    const result = await saveData();
    
    if (result.updated) {
      showSuccess("Changes saved successfully");
    } else {
      showError("No changes detected");
    }
  } catch (error) {
    showError(error.message);
  }
};
```

### **Toast with Actions (Future Enhancement)**

```jsx
// Potential future feature
showSuccess("Crop added successfully", {
  action: {
    label: "View",
    onClick: () => navigate("/my-posts")
  }
});
```

---

## 🎨 **Customization Options**

### **Change Default Duration**

```jsx
// In your component
const { showSuccess, showError } = useToast();

// Short duration (2 seconds)
showSuccess("Quick action!", 2000);

// Long duration (10 seconds)
showError("Important error message", 10000);
```

### **Modify Colors** (in index.css)

```css
/* Success colors */
.success-toast {
  --success-color: #4CAF50;  /* Change this */
}

/* Error colors */
.error-toast {
  --error-color: #EF4444;    /* Change this */
}
```

---

## 📱 **Responsive Behavior**

```
Desktop (> 768px):
  - Position: Top-right corner
  - Width: 320px - 400px
  - Stacks vertically with 12px gap

Mobile (< 768px):
  - Position: Top-right (16px from edge)
  - Width: Adapts to screen (min 280px)
  - Stacks vertically with 8px gap
  - Slight size reduction on very small screens
```

---

## ♿ **Accessibility**

- ✅ **ARIA labels** on close button
- ✅ **Keyboard accessible** (can be closed with Esc key - future)
- ✅ **Screen reader friendly**
- ✅ **High contrast** for readability
- ✅ **Hover pause** for users who need more time

---

## 🚀 **Performance**

- **Efficient**: Uses React Portal (no DOM nesting issues)
- **Lightweight**: No external dependencies
- **Smooth**: GPU-accelerated animations
- **Auto-cleanup**: Toasts auto-remove after duration
- **Memory-safe**: Proper cleanup on unmount

---

## 🎯 **Real-World Examples**

### **Replace Alert Statements**

**Before:**
```jsx
alert("Crop added successfully!");
alert("Failed to add crop");
```

**After:**
```jsx
showSuccess("Crop added successfully!");
showError("Failed to add crop");
```

### **Enhanced User Feedback**

**Before:**
```jsx
try {
  await api.call();
  // Silent success
} catch (error) {
  console.error(error); // User sees nothing
}
```

**After:**
```jsx
try {
  await api.call();
  showSuccess("Operation completed!");
} catch (error) {
  showError(error.message);
}
```

---

## 🎉 **Summary**

Your Toast component is now:
- ✅ **Professional** - Production-ready design
- ✅ **Beautiful** - Smooth animations and transitions
- ✅ **Functional** - Auto-dismiss, pause on hover, manual close
- ✅ **Theme-consistent** - Matches KrishiLink colors
- ✅ **User-friendly** - Clear feedback for all actions
- ✅ **Developer-friendly** - Easy to use with React hooks

**Replace all `alert()` statements with beautiful toasts!** 🎨✨

---

*Created: November 13, 2025*
*Version: 1.0.0*

