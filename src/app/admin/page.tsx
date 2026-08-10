'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Calendar, Sparkles, CheckCircle2, Clock, XCircle, 
  Trash2, Plus, Edit3, Filter, Search, RefreshCw, DollarSign, User, Phone, Mail, AlertCircle 
} from 'lucide-react';
import { ServiceItem } from '@/components/ServiceCard';

interface AppointmentItem {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  service: ServiceItem;
  date: string;
  time: string;
  notes?: string | null;
  status: 'Beklemede' | 'Onaylandı' | 'İptal';
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'services'>('appointments');
  
  // Appointments state
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [appStatusFilter, setAppStatusFilter] = useState('Tümü');
  const [appSearchQuery, setAppSearchQuery] = useState('');

  // Services state
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Cilt Bakımı');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('60');
  const [newServiceImageUrl, setNewServiceImageUrl] = useState('');
  const [submittingService, setSubmittingService] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoadingApps(true);
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoadingApps(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await fetch('/api/services?all=true');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoadingServices(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  const handleToggleServiceActive = async (service: ServiceItem) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error('Failed to toggle service:', err);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServiceCategory || !newServicePrice) return;

    try {
      setSubmittingService(true);
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newServiceName,
          category: newServiceCategory,
          description: newServiceDescription,
          price: parseFloat(newServicePrice),
          duration: parseInt(newServiceDuration),
          imageUrl: newServiceImageUrl,
        }),
      });

      if (res.ok) {
        setShowAddServiceModal(false);
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServicePrice('');
        setNewServiceImageUrl('');
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingService(false);
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = appStatusFilter === 'Tümü' || app.status === appStatusFilter;
    const matchesSearch =
      app.customerName.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
      app.customerPhone.includes(appSearchQuery) ||
      (app.service?.name || '').toLowerCase().includes(appSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate Dashboard Metrics
  const totalApps = appointments.length;
  const pendingApps = appointments.filter((a) => a.status === 'Beklemede').length;
  const confirmedApps = appointments.filter((a) => a.status === 'Onaylandı').length;
  const cancelledApps = appointments.filter((a) => a.status === 'İptal').length;
  const estimatedRevenue = appointments
    .filter((a) => a.status === 'Onaylandı')
    .reduce((sum, a) => sum + (a.service?.price || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-gray-900 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Yönetim Paneli</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            Güzellik Merkezi Kontrol Paneli
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-rose-100 shadow-sm self-start">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'appointments'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-rose-600'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Randevular ({appointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-rose-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hizmet Yönetimi ({services.length})</span>
          </button>
        </div>
      </div>

      {/* METRICS DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm space-y-1">
          <div className="text-xs text-gray-500 font-medium">Toplam Randevu</div>
          <div className="font-serif text-2xl font-bold text-gray-900">{totalApps}</div>
        </div>

        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-sm space-y-1">
          <div className="text-xs text-amber-700 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Beklemede
          </div>
          <div className="font-serif text-2xl font-bold text-amber-800">{pendingApps}</div>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
          <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Onaylanan
          </div>
          <div className="font-serif text-2xl font-bold text-emerald-800">{confirmedApps}</div>
        </div>

        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 shadow-sm space-y-1">
          <div className="text-xs text-rose-700 font-medium flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> İptal Edilen
          </div>
          <div className="font-serif text-2xl font-bold text-rose-800">{cancelledApps}</div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-gray-900 to-rose-950 p-5 rounded-2xl text-white shadow-sm space-y-1">
          <div className="text-xs text-gold-300 font-medium flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-gold-400" /> Onaylanan Ciro
          </div>
          <div className="font-serif text-2xl font-bold text-gold-400">
            ₺{estimatedRevenue.toLocaleString('tr-TR')}
          </div>
        </div>
      </div>

      {/* TAB 1: APPOINTMENTS MANAGEMENT */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-rose-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Müşteri adı veya telefon..."
                value={appSearchQuery}
                onChange={(e) => setAppSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-xs text-gray-500 font-semibold mr-1">Durum:</span>
              {['Tümü', 'Beklemede', 'Onaylandı', 'İptal'].map((st) => (
                <button
                  key={st}
                  onClick={() => setAppStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    appStatusFilter === st
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
              <button
                onClick={fetchAppointments}
                className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Yenile"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          {loadingApps ? (
            <div className="text-center py-20 text-gray-500 text-sm">Randevular yükleniyor...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 text-gray-500 space-y-2">
              <AlertCircle className="w-10 h-10 text-rose-300 mx-auto" />
              <p className="font-semibold text-sm">Kriterlere uygun randevu bulunamadı.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-rose-50/60 text-gray-700 font-semibold text-xs border-b border-rose-100 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Müşteri</th>
                      <th className="p-4">Hizmet & Tutar</th>
                      <th className="p-4">Tarih / Saat</th>
                      <th className="p-4">Notlar</th>
                      <th className="p-4">Durum</th>
                      <th className="p-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {filteredAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-rose-50/30 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{app.customerName}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3 h-3 text-rose-500" /> {app.customerPhone}
                          </div>
                          {app.customerEmail && (
                            <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3" /> {app.customerEmail}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{app.service?.name}</div>
                          <div className="text-xs text-rose-600 font-bold">
                            ₺{app.service?.price?.toLocaleString('tr-TR')}
                          </div>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{app.date}</div>
                          <div className="text-xs text-gray-500 font-bold">{app.time}</div>
                        </td>

                        <td className="p-4 max-w-xs text-xs text-gray-500 italic">
                          {app.notes || '-'}
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                              app.status === 'Onaylandı'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'İptal'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {app.status === 'Onaylandı' && <CheckCircle2 className="w-3 h-3" />}
                            {app.status === 'Beklemede' && <Clock className="w-3 h-3" />}
                            {app.status === 'İptal' && <XCircle className="w-3 h-3" />}
                            {app.status}
                          </span>
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-1">
                          {app.status !== 'Onaylandı' && (
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'Onaylandı')}
                              className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-emerald-200"
                              title="Onayla"
                            >
                              Onayla
                            </button>
                          )}

                          {app.status !== 'İptal' && (
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'İptal')}
                              className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-200"
                              title="İptal Et"
                            >
                              İptal
                            </button>
                          )}

                          {app.status !== 'Beklemede' && (
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'Beklemede')}
                              className="px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-xl text-xs font-bold transition-all border border-amber-200"
                              title="Beklet"
                            >
                              Beklet
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteAppointment(app.id)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SERVICES MANAGEMENT */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-gray-900">Mevcut Hizmet Kataloğu</h3>
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="inline-flex items-center gap-2 bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-md hover:bg-rose-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Hizmet Ekle</span>
            </button>
          </div>

          {loadingServices ? (
            <div className="text-center py-20 text-gray-500 text-sm">Hizmetler yükleniyor...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.id}
                  className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                    s.isActive ? 'border-rose-100' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                        {s.category}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>
                        {s.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">{s.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Fiyat / Süre</div>
                      <div className="font-bold text-rose-600 text-base">
                        ₺{s.price.toLocaleString('tr-TR')} <span className="text-xs font-normal text-gray-500">({s.duration} dk)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleServiceActive(s)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                          s.isActive
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {s.isActive ? 'Pasife Al' : 'Aktif Et'}
                      </button>
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD SERVICE MODAL */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-rose-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-xl font-bold text-gray-900">Yeni Hizmet Tanımla</h3>
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Hizmet Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Kolajen Bakımı"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Kategori *</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Cilt Bakımı">Cilt Bakımı</option>
                    <option value="Lazer Epilasyon">Lazer Epilasyon</option>
                    <option value="Kalıcı Makyaj">Kalıcı Makyaj</option>
                    <option value="Nail Art & Manikür">Nail Art & Manikür</option>
                    <option value="Bölgesel İncelme">Bölgesel İncelme</option>
                    <option value="Masaj & Spa">Masaj & Spa</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Fiyat (TL) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Süre (Dakika) *</label>
                  <input
                    type="number"
                    required
                    placeholder="60"
                    value={newServiceDuration}
                    onChange={(e) => setNewServiceDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Görsel URL (Unsplash)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newServiceImageUrl}
                    onChange={(e) => setNewServiceImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Açıklama</label>
                <textarea
                  rows={3}
                  placeholder="Hizmet detayları ve uygulama bilgileri..."
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submittingService}
                  className="px-6 py-2.5 rounded-xl font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-md disabled:opacity-50"
                >
                  {submittingService ? 'Ekleniyor...' : 'Hizmeti Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
