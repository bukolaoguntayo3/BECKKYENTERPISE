/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            
            {/* Catalog & Shopping Routes */}
            <Route path="shop" element={<CatalogPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="products" element={<CatalogPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="categories" element={<CategoriesPage />} />

            {/* Cart & Checkout */}
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />

            {/* Orders & Tracking */}
            <Route path="orders" element={<DashboardPage initialTab="orders" />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />

            {/* Customer Account & Dashboard */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="account" element={<DashboardPage />} />
            <Route path="profile" element={<DashboardPage initialTab="settings" />} />
            <Route path="addresses" element={<DashboardPage initialTab="addresses" />} />
            <Route path="wishlist" element={<DashboardPage initialTab="wishlist" />} />

            {/* Authentication & Password Recovery */}
            <Route path="auth" element={<AuthPage />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="signin" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />
            <Route path="signup" element={<AuthPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />

            {/* Informational Pages */}
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="support" element={<ContactPage />} />

            {/* Admin Management Area */}
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/dashboard" element={<AdminPage initialTab="dashboard" />} />
            <Route path="admin/products" element={<AdminPage initialTab="products" />} />
            <Route path="admin/categories" element={<AdminPage initialTab="categories" />} />
            <Route path="admin/orders" element={<AdminPage initialTab="orders" />} />
            <Route path="admin/customers" element={<AdminPage initialTab="customers" />} />
            <Route path="admin/inventory" element={<AdminPage initialTab="inventory" />} />
            <Route path="admin/promotions" element={<AdminPage initialTab="promotions" />} />
            <Route path="admin/payments" element={<AdminPage initialTab="payments" />} />
            <Route path="admin/delivery" element={<AdminPage initialTab="delivery" />} />
            <Route path="admin/reports" element={<AdminPage initialTab="reports" />} />
            <Route path="admin/settings" element={<AdminPage initialTab="settings" />} />

            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ShopProvider>
  );
}
