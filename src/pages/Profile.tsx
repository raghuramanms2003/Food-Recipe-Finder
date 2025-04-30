import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Save, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import RecipeList from '../components/recipes/RecipeList';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateProfile, logout, loading } = useAuth();
  const { recipes, loading: recipesLoading } = useRecipes();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter recipes to only show those created by the current user
  const userRecipes = recipes.filter(recipe => recipe.userId === user?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName) {
      toast.error('Name is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await updateProfile({ displayName, email });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update profile error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E76F51]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-[#E76F51] to-[#F4A261] py-8 px-6 text-white">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <div className="h-24 w-24 rounded-full bg-white/30 flex items-center justify-center text-white">
                <User className="h-12 w-12" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full text-[#E76F51]">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
              <p className="text-white/90">{user?.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Display Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Your name"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Your email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-[#E76F51] text-white rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2">Saving</span>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                    </span>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-1">Account Information</h2>
                <p className="text-gray-600">Manage your account details</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Recipes</h2>
        
        <RecipeList 
          recipes={userRecipes} 
          loading={recipesLoading}
          emptyMessage="You haven't created any recipes yet." 
        />
        
        {userRecipes.length === 0 && !recipesLoading && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/create-recipe')}
              className="px-6 py-2 bg-[#2A9D8F] text-white rounded-md"
            >
              Create Your First Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;