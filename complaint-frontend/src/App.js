import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [isAdmin] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [adminTab, setAdminTab] = useState('USERS'); 
  const [complaintFilter, setComplaintFilter] = useState('ALL'); 

  // ইউজার ডাটা (এখন আপডেট হবে)
  const [users, setUsers] = useState([
    { id: 101, name: 'Dalim Kumar', email: 'admin@system.com', role: 'ADMIN' },
    { id: 102, name: 'Vayu Mishra', email: 'vayu@gmail.com', role: 'USER' },
    { id: 103, name: 'Rahul Sharma', email: 'rahul@office.com', role: 'USER' }
  ]);

  const [complaints, setComplaints] = useState([
    { 
      id: 1, title: 'Internet Not Working', description: 'Connection lost since morning.', 
      complainantName: 'Vayu Mishra', complainantEmail: 'vayu@gmail.com', status: 'OPEN', 
      history: [{ timestamp: '19-07-2026 09:00 AM', status: 'OPEN', note: 'Complaint submitted.' }] 
    },
    { 
      id: 2, title: 'Software License Expired', description: 'Need renewal for Microsoft Office.', 
      complainantName: 'Rahul Sharma', complainantEmail: 'rahul@office.com', status: 'RESOLVED', 
      history: [
        { timestamp: '18-07-2026 10:00 AM', status: 'OPEN', note: 'Request created.' },
        { timestamp: '18-07-2026 02:00 PM', status: 'RESOLVED', note: 'License key updated.' }
      ] 
    }
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // সাবমিট লজিক (নতুন ইউজার অটো-অ্যাড হবে)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ১. কমপ্লেইন অ্যাড করা
    const newComplaint = {
      id: complaints.length + 1,
      title, description, complainantName: name, complainantEmail: email, status: 'OPEN',
      history: [{ timestamp: new Date().toLocaleString(), status: 'OPEN', note: 'Complaint successfully submitted.' }]
    };
    setComplaints([...complaints, newComplaint]);

    // ২. নতুন ইউজার কি না চেক করা এবং অ্যাড করা
    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!userExists) {
      const newUser = {
        id: users.length + 101, // নতুন আইডি জেনারেট
        name: name,
        email: email,
        role: 'USER'
      };
      setUsers([...users, newUser]);
    }

    // ৩. ফর্ম ক্লিয়ার করা
    setName(''); setEmail(''); setTitle(''); setDescription('');
    alert("✅ Complaint Submitted! New User Profile Created (if applicable).");
  };

  // অ্যাডমিন স্ট্যাটাস আপডেট লজিক
  const handleResolve = (id) => {
    setComplaints(complaints.map(c => {
      if(c.id === id) {
        return {
          ...c,
          status: 'RESOLVED',
          history: [...c.history, { timestamp: new Date().toLocaleString(), status: 'RESOLVED', note: 'Issue successfully resolved by Admin.' }]
        };
      }
      return c;
    }));
  };

  // অ্যাডমিন প্যানেল ফিল্টার কাউন্ট
  const filteredComplaints = complaints.filter(c => complaintFilter === 'ALL' ? true : c.status === complaintFilter);
  const pendingCount = complaints.filter(c => c.status === 'OPEN').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <Router>
      <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white/5 p-6 border-r border-white/10 flex flex-col shadow-2xl">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 border-b border-white/10 pb-4 mb-6">System Menu</h2>
            <nav className="flex flex-col gap-3 font-medium">
              <Link to="/" className="p-3 hover:bg-white/10 rounded-lg transition-colors">📊 Dashboard</Link>
              <Link to="/submit" className="p-3 hover:bg-white/10 rounded-lg transition-colors text-blue-300">📝 Submit Complaint</Link>
              {isAdmin && <Link to="/admin" className="p-3 hover:bg-white/10 rounded-lg text-emerald-400 transition-colors bg-white/5 font-bold">⚙️ Admin Panel</Link>}
            </nav>
          </div>
          <div className="mt-auto pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Developed by</p>
            <p className="text-sm font-black text-emerald-400 tracking-wider">DALIM KUMAR</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-y-auto h-screen">
          <Routes>
            
            {/* Dashboard Route */}
            <Route path="/" element={
              <div>
                <h1 className="text-3xl font-bold mb-8">Complaint Dashboard</h1>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-gray-900">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-4 border-b font-bold">ID</th>
                        <th className="p-4 border-b font-bold">Submitted By</th>
                        <th className="p-4 border-b font-bold">Title</th>
                        <th className="p-4 border-b font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map((c) => (
                        <tr key={c.id} className="border-b hover:bg-emerald-50 cursor-pointer transition-colors" onClick={() => setSelectedComplaint(c)}>
                          <td className="p-4 font-mono text-gray-500">#{c.id}</td>
                          <td className="p-4 font-semibold text-gray-700">{c.complainantName}</td>
                          <td className="p-4 font-semibold text-gray-800">{c.title}</td>
                          <td className="p-4"><span className={`px-3 py-1 text-white font-bold rounded-full text-xs shadow-sm ${c.status === 'OPEN' ? 'bg-blue-500' : 'bg-emerald-500'}`}>{c.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            } />

            {/* Submit Route */}
            <Route path="/submit" element={
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Submit New Complaint</h1>
                <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">Your Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Title</label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Description</label>
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl h-32 focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    </div>
                    <button type="submit" className="mt-2 bg-gray-900 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">🚀 Submit</button>
                  </form>
                </div>
              </div>
            } />

            {/* Admin Panel Route */}
            <Route path="/admin" element={
              <div>
                <h1 className="text-3xl font-bold mb-8 text-emerald-400">Admin Control Panel</h1>
                
                {/* 4 Clickable Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                  <button onClick={() => setAdminTab('USERS')} className={`text-left p-5 rounded-2xl shadow-xl border-l-4 border-purple-500 transition-all ${adminTab === 'USERS' ? 'bg-purple-50 text-gray-900 scale-105' : 'bg-white text-gray-900 hover:bg-gray-50'}`}>
                    <h3 className="text-gray-500 font-bold mb-1 text-sm">Total Users</h3>
                    <p className="text-3xl font-black">{users.length}</p>
                  </button>
                  
                  <button onClick={() => {setAdminTab('COMPLAINTS'); setComplaintFilter('ALL');}} className={`text-left p-5 rounded-2xl shadow-xl border-l-4 border-blue-500 transition-all ${adminTab === 'COMPLAINTS' && complaintFilter === 'ALL' ? 'bg-blue-50 text-gray-900 scale-105' : 'bg-white text-gray-900 hover:bg-gray-50'}`}>
                    <h3 className="text-gray-500 font-bold mb-1 text-sm">All Complaints</h3>
                    <p className="text-3xl font-black">{complaints.length}</p>
                  </button>
                  
                  <button onClick={() => {setAdminTab('COMPLAINTS'); setComplaintFilter('OPEN');}} className={`text-left p-5 rounded-2xl shadow-xl border-l-4 border-yellow-500 transition-all ${adminTab === 'COMPLAINTS' && complaintFilter === 'OPEN' ? 'bg-yellow-50 text-gray-900 scale-105' : 'bg-white text-gray-900 hover:bg-gray-50'}`}>
                    <h3 className="text-gray-500 font-bold mb-1 text-sm">Pending</h3>
                    <p className="text-3xl font-black text-yellow-600">{pendingCount}</p>
                  </button>

                  <button onClick={() => {setAdminTab('COMPLAINTS'); setComplaintFilter('RESOLVED');}} className={`text-left p-5 rounded-2xl shadow-xl border-l-4 border-emerald-500 transition-all ${adminTab === 'COMPLAINTS' && complaintFilter === 'RESOLVED' ? 'bg-emerald-50 text-gray-900 scale-105' : 'bg-white text-gray-900 hover:bg-gray-50'}`}>
                    <h3 className="text-gray-500 font-bold mb-1 text-sm">Resolved</h3>
                    <p className="text-3xl font-black text-emerald-600">{resolvedCount}</p>
                  </button>
                </div>

                {/* Dynamic Table */}
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-gray-900 mb-10">
                  <div className="bg-gray-100 p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                      {adminTab === 'USERS' ? 'Registered Users' : complaintFilter === 'OPEN' ? 'Pending Actions Needed' : complaintFilter === 'RESOLVED' ? 'Resolved Complaints' : 'Complete Complaint Log'}
                    </h2>
                  </div>
                  
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 border-b font-bold text-gray-600">ID</th>
                        <th className="p-4 border-b font-bold text-gray-600">{adminTab === 'USERS' ? 'Name' : 'Reported By'}</th>
                        <th className="p-4 border-b font-bold text-gray-600">{adminTab === 'USERS' ? 'Email' : 'Title'}</th>
                        <th className="p-4 border-b font-bold text-gray-600">Action / Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* ইউজার টেবিল */}
                      {adminTab === 'USERS' && users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-mono text-gray-500">#{u.id}</td>
                          <td className="p-4 font-bold">{u.name}</td>
                          <td className="p-4 text-gray-600">{u.email}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 text-white font-bold rounded-full text-xs shadow-sm ${u.role === 'ADMIN' ? 'bg-purple-500' : 'bg-gray-500'}`}>{u.role}</span>
                          </td>
                        </tr>
                      ))}

                      {/* কমপ্লেইন টেবিল */}
                      {adminTab === 'COMPLAINTS' && filteredComplaints.map((c) => (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-mono text-gray-500">#{c.id}</td>
                          <td className="p-4 font-bold">{c.complainantName}</td>
                          <td className="p-4 text-gray-800 font-semibold">{c.title}</td>
                          <td className="p-4">
                            {c.status === 'OPEN' ? (
                              <button onClick={() => handleResolve(c.id)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-lg transition-transform transform hover:-translate-y-0.5">
                                ✔️ Mark Resolve
                              </button>
                            ) : (
                              <span className="px-3 py-1 bg-gray-200 text-emerald-700 font-bold rounded-full text-xs">✅ RESOLVED</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      
                      {/* যদি কোনো ডাটা না থাকে */}
                      {adminTab === 'COMPLAINTS' && filteredComplaints.length === 0 && (
                        <tr>
                          <td colSpan="4" className="p-10 text-center text-gray-500 font-bold">No records found in this category.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            } />
          </Routes>
        </main>

        {/* Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedComplaint(null)}>
            <div className="bg-white text-gray-900 p-8 rounded-2xl max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-black text-gray-800">{selectedComplaint.title}</h2>
                <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-red-500 text-3xl leading-none">&times;</button>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {selectedComplaint.complainantName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-wider">Reported By</p>
                  <p className="font-bold text-gray-800">{selectedComplaint.complainantName}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">{selectedComplaint.description}</p>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Audit Logs</h3>
                <div className="space-y-4">
                  {selectedComplaint.history.map((h, i) => (
                    <div key={i} className="text-sm border-l-4 border-emerald-500 pl-4 relative">
                      <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[5px] top-1.5"></div>
                      <div className="font-bold text-gray-500 text-xs mb-1">{h.timestamp}</div>
                      <div><span className="font-bold text-emerald-600">{h.status}</span> : {h.note}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="mt-6 w-full bg-gray-900 hover:bg-gray-800 transition-colors text-white py-3 rounded-xl font-bold" onClick={() => setSelectedComplaint(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;