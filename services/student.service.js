const db = require('./db.service');
require('dotenv').config();

const methods = {
    getOne(id)
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                let columns = ['primary_student_ID', 'student_ID', 'student_position', 'student_first_name',
                    'student_last_name', 'student_nickname', 'student_first_name_thai', 'student_last_name_thai', 'student_nickname_thai',
                    'student_gender', 'student_major', 'student_level', 'student_class', 'student_phone', 'student_line_ID', 'student_image',
                    'student_email'];

                const result = await db.query(`SELECT ${columns.join(', ')} FROM ${process.env.DB_TABLE_STUDENT} WHERE student_ID = ${id}`);
                resolve(result);

            } catch (error)
            {
                reject(error);
            }
        });
    },
    getAll()
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                let columns = ['primary_student_ID', 'student_ID', 'student_position', 'student_first_name',
                    'student_last_name', 'student_nickname', 'student_first_name_thai', 'student_last_name_thai', 'student_nickname_thai',
                    'student_gender', 'student_major', 'student_level', 'student_class', 'student_phone', 'student_line_ID', 'student_image',
                    'student_email'];

                const result = await db.query(`SELECT ${columns.join(', ')} FROM ${process.env.DB_TABLE_STUDENT}`);
                resolve(result);

            } catch (error)
            {
                reject(error);
            }
        });
    },
    getInfo()
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                let columns = ['student_ID', 'student_first_name',
                    'student_last_name', 'student_first_name_thai', 'student_last_name_thai'];

                const result = await db.query(`SELECT ${columns.join(', ')} FROM ${process.env.DB_TABLE_STUDENT}`);
                resolve(result);

            } catch (error)
            {
                reject(error);
            }
        });
    },
    getByAmount(major, amount)
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                let columns = ['primary_student_ID', 'student_ID', 'student_position', 'student_first_name',
                    'student_last_name', 'student_nickname', 'student_first_name_thai', 'student_last_name_thai', 'student_nickname_thai',
                    'student_gender', 'student_major', 'student_level', 'student_class', 'student_phone', 'student_line_ID', 'student_image',
                    'student_email'];

                const result = await db.query(`SELECT ${columns.join(', ')} FROM ${process.env.DB_TABLE_STUDENT} WHERE student_major = ${major} ORDER BY student_ID LIMIT ${amount}`);
                resolve(result);

            } catch (error)
            {
                reject(error);
            }
        });
    },
    getByClass(level, classes)
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                let columns = ['primary_student_ID', 'student_ID', 'student_position', 'student_first_name',
                    'student_last_name', 'student_nickname', 'student_first_name_thai', 'student_last_name_thai', 'student_nickname_thai',
                    'student_gender', 'student_major', 'student_level', 'student_class', 'student_phone', 'student_line_ID', 'student_image',
                    'student_email'];

                const result = await db.query(`SELECT ${columns.join(', ')} FROM ${process.env.DB_TABLE_STUDENT} WHERE student_level = ${level} && student_class = ${classes}`);
                resolve(result);

            } catch (error)
            {
                reject(error);
            }
        });
    },
    addOne(object)
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                const columns = [
                    'student_ID', 'student_position', 'student_first_name', 'student_last_name',
                    'student_nickname', 'student_first_name_thai', 'student_last_name_thai', 'student_nickname_thai',
                    'student_gender', 'student_major', 'student_level', 'student_class',
                    'student_phone', 'student_line_ID', 'student_image', 'student_email'
                ];

                const row = columns.map((element) =>
                {
                    if (object[element] == null)
                    {
                        reject('You have a missing field');
                    }
                    return object[element];
                });

                const email = object['student_email'];
                const emailIsValid = (await db.query(`SELECT student_email FROM ${process.env.DB_TABLE_STUDENT} WHERE student_email = ?`, [email])).length === 0;

                if (emailIsValid)
                {
                    const result = await db.query(`INSERT INTO ${process.env.DB_TABLE_STUDENT} (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`, row);
                    resolve(result);
                } else
                {
                    reject('That email is already in use');
                }

            } catch (error)
            {
                reject(error);
            }

        });
    },
    updateAt(id, object)
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {

                let allowedcolumns = ['student_ID', 'student_position', 'student_first_name',
                    'student_last_name', 'student_nickname', 'student_first_name_thai', 'student_last_name_thai', 'student_nickname_thai',
                    'student_gender', 'student_major', 'student_level', 'student_class', 'student_phone', 'student_line_ID', 'student_image',
                    'student_email']; //all columns that can be updated

                let columns = [];
                let values = [];

                for (let c of allowedcolumns)
                {
                    if (c in object)
                    {
                        //check if there is a value for that column in the request body
                        columns.push(`${c} = ?`);
                        values.push(object[c]);
                    }
                }

                if (columns.length === 0)
                {
                    return res.sendStatus(204);
                }

                const updateColumns = columns.join(', ');
                const result = await db.query(`UPDATE ${process.env.DB_TABLE_STUDENT} SET ${updateColumns} WHERE primary_student_ID = ?`, [...values, id]);
                resolve(result);
            } catch (error)
            {
                reject(error);
            }

        });
    },
    removeAt(id)
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                const result = await db.query(`DELETE FROM ${process.env.DB_TABLE_STUDENT} WHERE primary_student_ID = ?`, [id]);
                resolve(result);
            } catch (error)
            {
                reject(error);
            }

        });
    }
};

module.exports = { ...methods };