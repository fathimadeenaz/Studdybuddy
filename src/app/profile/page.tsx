'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    hobbies: '',
    education: '',
    interests: '',
    course: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setFormData({
          name: data.name || '',
          class: data.class || '',
          hobbies: data.hobbies || '',
          education: data.education || '',
          interests: data.interests || '',
          course: data.course || '',
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleUpdate = async () => {
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { ...formData });

      setUserData((prev: any) => ({ ...prev, ...formData }));
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to save changes. Try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#961ba0] to-[#6a0dad]">
        <p className="text-white text-lg">Loading profile...</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] p-6 text-white">
      <h1 className="text-3xl font-bold text-white mb-6">👤 Profile</h1>

      <section className="max-w-xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg p-6 space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          {userData?.avatarUrl ? (
            <Image
              src={userData.avatarUrl}
              alt="Profile Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-white/20 rounded-full" />
          )}
          <p className="text-white/80 text-sm italic">
            Avatar uploads are currently disabled.
          </p>
        </div>

        {/* Profile Details */}
        {!editing ? (
          <>
            <p>
              <strong>Name:</strong> {userData?.name || 'N/A'}
            </p>
            <p>
              <strong>Class:</strong> {userData?.class || 'N/A'}
            </p>
            <p>
              <strong>Hobbies:</strong> {userData?.hobbies || 'N/A'}
            </p>
            <p>
              <strong>Education:</strong> {userData?.education || 'N/A'}
            </p>
            <p>
              <strong>Course:</strong> {userData?.course || 'N/A'}
            </p>
            <p>
              <strong>Interests:</strong> {userData?.interests || 'N/A'}
            </p>

            {/* Learning Progress */}
            <div>
              <strong>Learning Progress:</strong>
              {userData?.progress ? (
                <ul className="mt-2 space-y-2">
                  {Object.entries(userData.progress).map(([topic, value]) => (
                    <li key={topic}>
                      <div className="flex justify-between mb-1 text-white/80">
                        <span>{topic}</span>
                        <span>{Number(value)}%</span>
                      </div>
                      <div className="w-full h-3 bg-white/20 rounded-full">
                        <div
                          className="h-3 bg-[#38b6ff] rounded-full transition-all duration-300"
                          style={{ width: `${Number(value)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/80 mt-1">0% Complete</p>
              )}
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 px-5 py-2 bg-[#38b6ff] hover:bg-[#e0b1ee] text-white font-semibold rounded-lg transition duration-300"
            >
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 rounded-lg mb-3 text-black focus:outline-none"
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full p-2 rounded-lg mb-3 text-black focus:outline-none"
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Hobbies"
              value={formData.hobbies}
              onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
              className="w-full p-2 rounded-lg mb-3 text-black focus:outline-none"
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Education"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full p-2 rounded-lg mb-3 text-black focus:outline-none"
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full p-2 rounded-lg mb-3 text-black focus:outline-none"
              disabled={saving}
            />
            <input
              type="text"
              placeholder="Interests"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className="w-full p-2 rounded-lg mb-3 text-black focus:outline-none"
              disabled={saving}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpdate}
                className="flex-1 px-4 py-2 bg-[#38b6ff] hover:bg-[#e0b1ee] text-white font-semibold rounded-lg disabled:opacity-50 transition duration-300"
                disabled={saving}
              >
                {saving ? 'Saving...' : '✅ Save'}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 px-4 py-2 bg-[#e0b1ee] hover:bg-[#38b6ff] text-black font-semibold rounded-lg transition duration-300"
                disabled={saving}
              >
                ❌ Cancel
              </button>
            </div>
          </>
        )}

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition duration-300"
        >
          🚪 Log Out
        </button>
      </section>
    </main>
  );
}
