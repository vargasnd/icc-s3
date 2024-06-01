import { useEffect, useRef, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const createData = async (payload) => {
  const { data } = await api.post("/registration", {
    ...payload,
  });
  return data;
};

const deleteData = async (id) => {
  const { data } = await api.delete("/registration/" + id);
  return data;
};

function App() {
  const [name, setNama] = useState("");
  const [nim, setNIM] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await api.get("/registration");
    setData(data.data);
  };

  const ref = useRef(null);

  async function handleClick(e) {
    e.preventDefault();

    ref.current.reset();

    await createData({
      fullName: name,
      nim,
      email,
      phoneNumber: phone,
      address,
    });
    await getData();
  }

  async function handleDelete(id) {
    await deleteData(id);
    await getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="w-full h-screen bg-[#7B96FE] flex flex-col justify-center items-center gap-8">
        <h1 className="text-2xl text-white">Form Pendaftaran</h1>

        <form
          ref={ref}
          className="w-1/2 flex justify-between"
          onSubmit={handleClick}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname" className="text-white text-sm">
                Fullname
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                onChange={(e) => setNama(e.target.value)}
                className="rounded-2xl px-4 py-2 text-sm"
                placeholder="Masukkan Fullname"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="NIM" className="text-white text-sm">
                NIM
              </label>

              <input
                id="NIM"
                name="NIM"
                type="text"
                onChange={(e) => setNIM(e.target.value)}
                className="rounded-2xl px-4 py-2 text-sm"
                placeholder="Masukkan NIM"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-white text-sm">
                Email
              </label>

              <input
                id="Email"
                name="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl px-4 py-2 text-sm"
                placeholder="Masukkan Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Phone Number" className="text-white text-sm">
                Phone Number
              </label>

              <input
                id="Phone Number"
                name="Phone Number"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-2xl px-4 py-2 text-sm"
                placeholder="Masukkan Phone Number"
              />
            </div>
            <button
              type="submit"
              className="bg-[#66C770] mt-4 text-white rounded-md py-1 shadow-md"
            >
              Submit
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Address" className="text-white text-sm">
              Address
            </label>

            <textarea
              id="Address"
              name="Address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-2xl px-4 py-2 text-sm"
              placeholder="Masukkan Address"
            />
          </div>
        </form>
      </div>

      {/* table */}
      <div className="w.full min-h-screen py-4 px-2">
        <div className="flex gap-x-2 items-center mb-2">
          <input
            type="text"
            className="w-1/3 border border-gray-400 outline-none rounded-md p-1"
            placeholder="Cari"
          />
          <button
            className="bg-[#66C770] text-white rounded-md py-1 px-2
          text-center shadow-md"
          >
            Tambah Data
          </button>
        </div>
        <div className="border rounded-lg shadow overflow-x-scroll">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Nama Lengkap
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  No Telpon
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  NIM
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Alamat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {index + 1}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {item.fullName}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {item.phoneNumber}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {item.email}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {item.nim}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {item.address}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                  text-gray-800"
                  >
                    {item.paidStatus}
                  </td>
                  <td
                    className="px-3 py-4 whitespace-nowrap text-sm font-medium
                    text-gray-800"
                  >
                    <div className="flex gap-2 items.center justify-center">
                      <button
                        onClick={async () => await handleDelete(item.id)}
                        className="bg-red-500 text-white rounded-md px-2 text-xs
                        py-1 text-center"
                        title="edit"
                      >
                        Hapus
                      </button>
                      <button
                        className="bg-yellow-300 text-white rounded-md px-2 text-xs
                        py-1 text-center"
                        title="edit"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default App;
