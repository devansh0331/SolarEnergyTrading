import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";

const TABLE_HEAD = [
  "Data/Time",
  "Device ID",
  "Voltage (V)",
  "Current (A)",
  "Power (W)",
  "Energy (kWh)",
  "Frequency (Hz)",
  "Power Factor (PF)",
];

export function EnergyRecords() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL =
    "https://script.google.com/macros/s/AKfycbyviZN9K4sXRkDdrPIXXERh2KHcLN51VH5CgZFL145UdAqWw1cqhW9_pM3_GLQqcBXRaA/exec";

  const fetchData = async () => {
    setLoading(true);
    await fetch(URL)
      .then((response) => response.json())
      .then((resData) => {
        setLoading(false);
        setData(resData);

        console.log(resData);
      })
      .catch((error) => console.log("Error:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full overflow-y-hidden-hidden h-screen bg-off ">
      <div className="pt-3 pb-6">
        <p className="text-xl text-text text-center font-semibold">
          Energy Transfer Records
        </p>
        <p className="text-sm text-center ">
          Below are the Real-time records of your Energy Consumption{" "}
        </p>
      </div>
      <Card className="h-full w-11/12 mx-auto shadow-md shadow-gray-300 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full relative">
            {loading && (
              <tr className="absolute left-1/2 top-36">
                <Grid
                  visible={true}
                  height="60"
                  width="60"
                  color="#0C6CF2"
                  ariaLabel="grid-loading"
                  radius="9.5"
                  wrapperClass="grid-wrapper"
                />
              </tr>
            )}
            {data.map(
              (
                {
                  timestamp,
                  energyMeterID,
                  voltage,
                  current,
                  power,
                  energy,
                  frequency,
                  pf,
                },
                index
              ) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={energyMeterID}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {timestamp}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {energyMeterID}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {voltage}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {current}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {power}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {energy}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {frequency}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {pf}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
