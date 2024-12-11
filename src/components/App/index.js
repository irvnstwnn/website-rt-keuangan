import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "../Login/Login";
import Dashboard from "../Dashboard";
import Navbar from "../Navbar/Navbar";
import DashboardAdmin from "../DashboardAdmin";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import SuratPengantar from "../SuratPengantar";
import StatusSurat from "../StatusSurat";
import ProsesSurat from "../ProsesSurat";
import DataPenduduk from "../JumlahPenduduk";
import Admin from "../Admin";
import DetailSurat from "../DetailSurat";
import ListSurat from "../ListSurat";
import ListPenduduk from "../JumlahPenduduk/ListPenduduk";
import Add from "../JumlahPenduduk/Add";
import AddBerita from "../BeritaDanPengumuman/Add";
import DataPendudukUser from "../DataPendudukUser";
import Edit from "../JumlahPenduduk/Edit";
import TentangKami from "../TentangKami";
import ListBerita from "../BeritaDanPengumuman/ListBerita";
import BeritaDanPengumuman from "../BeritaDanPengumuman";
import Register from "../Register";
import EditBerita from "../BeritaDanPengumuman/EditBerita";
import EditPengumuman from "../BeritaDanPengumuman/EditPengumuman";
import DetailBerita from "../DetailBerita";
import DashboardBendahara from "../DashboardBendahara";
import Bendahara from "../DashboardBendahara/Bendahara";
import Keuangan from "../DashboardBendahara/keuangan";
import ListKeuangan from "../DashboardBendahara/keuangan/listkeuangan";
import AddKeuangan from "../DashboardBendahara/keuangan/addkeuangan/AddKeuangan";
import EditKeuangan from "../DashboardBendahara/keuangan/editkeuangan";
import KeuanganWarga from "../Keuangan";

const App = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(`ini email user: ${user.email}`);
        setIsFetching(false);
        if (user.email == "bendaharart@gmail.com") {
          setRole("Bendahara");
        } else {
          setRole("User");
        }
        return;
      }
      setIsFetching(false);
      setUser(null);
      setRole("Guest");
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    Swal.fire({
      title: "Loading...",
      text: "Mohon Tunggu",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }

  return (
    <div>
      <Router>
        <Navbar user={user} role={role} />
        <Routes>
          <Route
            path="/"
            element={user ? <KeuanganWarga /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/statussurat"
            element={user ? <StatusSurat /> : <Navigate to="/login" />}
          />
          {/* <Route path="/suratpengantar" element={<SuratPengantar />} /> */}

          {/* <Route path="/detailberita/:id" element={<DetailBerita />} />
          <Route path="/tentangkami" element={<TentangKami />} />
          <Route path="/keuangan" element={<KeuanganWarga />} /> */}

          {/* <Route path="/datapenduduk" element={<DataPendudukUser />} /> */}

          {role == "Bendahara" && (
            <Route
              path="/dashboardbendahara"
              element={
                <ProtectedRoute user={user}>
                  <DashboardBendahara></DashboardBendahara>
                </ProtectedRoute>
              }
            >
              <Route path="bendahara" element={<Bendahara />} />
              <Route path="keuangan" element={<Keuangan />}>
                <Route path="listkeuangan" element={<ListKeuangan />} />
                <Route path="add" element={<AddKeuangan />} />
                <Route path=":id" element={<EditKeuangan />} />
              </Route>
            </Route>
          )}

          {/* 
          { role == "Admin" && (
            <Route
            path='/dashboardadmin'
            element={
              <ProtectedRoute user={user}>
                <DashboardAdmin></DashboardAdmin>
              </ProtectedRoute>
            }>
              <Route path="admin" element={<Admin />} />
              <Route path="prosessurat" element={<ProsesSurat />}>
                <Route path=":id" element={<DetailSurat />} />
                <Route path="listsurat" element={<ListSurat />} />
              </Route>
              <Route path="datapenduduk" element={<DataPenduduk />}>
                <Route path="listpenduduk" element={<ListPenduduk />} />
                <Route path="add" element={<Add />} />
                <Route path=":id" element={<Edit />} />
              </Route>

              <Route path="beritadanpengumuman" element={<BeritaDanPengumuman />}>
                <Route path="listberita" element={<ListBerita />} />
                <Route path="add" element={<AddBerita />} />
                <Route path=":id" element={<EditBerita />} />
                <Route path="pengumuman/:id" element={<EditPengumuman />} />
              </Route>
            </Route>
          )} */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
