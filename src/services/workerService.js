// 🔥 Dummy Worker APIs

export const registerWorker = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.name || !data.phone || !data.confirmPhone) {
        reject({ message: "Fill all mandatory fields" });
      } else if (data.phone !== data.confirmPhone) {
        reject({ message: "Phone numbers do not match" });
      } else if (data.password !== data.confirmPassword) {
        reject({ message: "Passwords do not match" });
      } else {
        resolve({
          message: "Worker registered successfully",
        });
      }
    }, 1000);
  });
};

export const loginWorker = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Dummy login check
      if (data.phone === "9999999999" && data.password === "1234") {
        resolve({
          token: "worker-token",
          worker: { phone: data.phone },
        });
      } else {
        reject({ message: "Invalid phone or password" });
      }
    }, 1000);
  });
};